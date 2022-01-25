import {
  inject,
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from "@loopback/core";
import { Response, RestBindings } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { Logs, Projects, Users } from "../models";
import {
  LogsRepository,
  ProjectRepository,
  UserRepository,
} from "../repositories";

import getIdFromUrl from "../shared/getIdFromUrl.shared";
import { v4 as uuidv4 } from "uuid";
import compareArrays from "../shared/compareArrays.shared";

enum actionTypes {
  create = "create",
  deleteById = "delete",
  delete = "delete",
  updateById = "update",
  update = "update",
}

enum userActions {
  create = `User was created`,
  delete = `User was deleted`,
  update = `User was updated`,
}

enum projectActions {
  create = `Project was created`,
  delete = `Project was deleted`,
  update = `Project was updated`,
  addedToProject = `User was added to project`,
  removedFromProject = `User was removed from project`,
}

class ActionsLogger {
  public instanceName: string;
  public instanceActions: any;
  public logsRepository: LogsRepository;

  public response: Response;
  public request: Request;

  static actions = {
    users: userActions,
    projects: projectActions,
  };

  constructor(
    instanceName: string,
    logsRepository: LogsRepository,
    response: Response,
    request: any
  ) {
    this.instanceName = instanceName;
    this.instanceActions =
      ActionsLogger.actions[
        this.instanceName as keyof typeof ActionsLogger.actions
      ];
    this.logsRepository = logsRepository;

    this.response = response;
    this.request = request;
  }

  actionInvoker(
    method: string,
    parameters: { body?: any; url?: string }
  ): Promise<Logs> | unknown {
    const date = new Date(Date.now());
    const action =
      this.instanceActions[method as keyof typeof this.instanceActions];
    const literalDate = `| ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    const msg = `${action} ${literalDate}`;

    const instanceMethod: void | unknown = this[method as keyof typeof this];
    
    if (actionTypes[method as keyof typeof actionTypes] && instanceMethod) {
      return (
        typeof instanceMethod === "function" &&
        instanceMethod.call(this, action, parameters, msg)
      );
    }

    if (parameters.body)
      return this.invokeWithBody(action, parameters.body, msg);
    else
      return (
        parameters.url && this.invokeWithUrlParams(action, parameters.url, msg)
      );
  }

  invokeWithBody(
    action: string,
    body: any,
    msg: string
  ): Promise<Logs> | unknown {
    if (!body) return;

    this.response.once("finish", () => {
      if (this.request.body) {
        const { id } = this.request.body as any;

        console.log("body", this.request.body);
        this.logsRepository.create({
          id: uuidv4(),
          action,
          date: Date.now(),
          msg,
          instanceId: id,
          instanceType: this.instanceName,
        });
      }
    });
  }

  invokeWithUrlParams(action: string, url: string, msg: string) {
    const id = getIdFromUrl(url);
    if (!id) return;

    this.response.once('finish', () => {
      this.logsRepository.create({
        id: uuidv4(),
        action,
        date: Date.now(),
        msg,
        instanceId: id,
        instanceType: this.instanceName,
      });
    });
  }

  update(action: string, params: any, msg: string) {
    const { url, body } = params;
    
    const id = getIdFromUrl(url) || body.id;

    this.response.once('finish', () => {
      this.logsRepository.create({
        id: uuidv4(),
        action,
        date: Date.now(),
        msg,
        instanceId: id,
        instanceType: this.instanceName,
      });
    });
  }
}

class ProjectsLogger extends ActionsLogger {
  public projectRepository: ProjectRepository;

  constructor(
    instanceName: string,
    logsRepository: LogsRepository,
    response: Response,
    request: any,
    projectRepository: ProjectRepository
  ) {
    super(instanceName, logsRepository, response, request);
    this.projectRepository = projectRepository;
  }

  async update(action: string, params: any, msg: string) {
    console.log("I was called");
    const { url, body } = params;

    super.update(action, params, msg);

    const id = getIdFromUrl(url) || body.id;

    const newSubParticipants = body.subParticipants;
    console.log('New participants', newSubParticipants);
    const prevProject = await this.projectRepository.findById(id);
    console.log('Prev project', prevProject);
    const prevSubParticipants = prevProject.subParticipants;

    const comparation = compareArrays(
      newSubParticipants,
      prevSubParticipants as []
    );

    if (comparation.result) return;
    else {
      const { difference } = comparation;
      console.log("diff", comparation.difference);

      this.response.once('finish', () => {
        difference.forEach((userId) => {
          const action = !prevSubParticipants?.includes(userId)
            ? this.instanceActions["addedToProject"]
            : this.instanceActions["removedFromProject"];

          const newMsg = `${action} | ${msg.split("|")[1]}`;

          this.logsRepository.create({
            id: uuidv4(),
            action,
            date: Date.now(),
            msg: newMsg,
            instanceId: id,
            instanceType: this.instanceName,
            subInstanceId: userId,
            subInstanceType: 'user'
          });
        });
      });
    }
  }
}

/**s
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({ tags: { key: ActionsInterceptor.BINDING_KEY } })
export class ActionsInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ActionsInterceptor.name}`;

  constructor(
    @repository(LogsRepository) public logsRepository: LogsRepository,
    @repository(ProjectRepository) public projectsRepository: ProjectRepository
  ) {}

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>
  ) {
    const { args, methodName } = invocationCtx;

    const httpReq = await invocationCtx.get(RestBindings.Http.REQUEST, {
      optional: true,
    });
    const httpRes = await invocationCtx.get(RestBindings.Http.RESPONSE, {
      optional: true,
    });

    try {
      console.log("args", args);
      if (httpRes && httpReq) {
        const instanceType = httpReq?.url.split("/")[1];

        console.log("name", methodName);

        const loggers = {
          users: new ActionsLogger(
            "users",
            this.logsRepository,
            httpRes,
            httpReq
          ),
          projects: new ProjectsLogger(
            "projects",
            this.logsRepository,
            httpRes,
            httpReq,
            this.projectsRepository
          ),
        };

        const logger = loggers[instanceType as keyof typeof loggers];

        const action = actionTypes[methodName as keyof typeof actionTypes];

        console.log("action", action);

        action &&
          logger &&
          logger.actionInvoker(
            action,
            { body: httpReq.body && httpReq.body, url: httpReq.url }
          );
      }

      const result = await next();

      return result;
    } catch (err) {
      throw err;
    }
  }
}
