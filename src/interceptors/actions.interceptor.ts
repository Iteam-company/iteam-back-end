import {
  /* inject, */
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {ControllerInstance, Response, RestBindings} from '@loopback/rest';
import { repository } from '@loopback/repository';
import { Logs } from '../models';
import { LogsRepository, ProjectRepository, UserRepository } from '../repositories';

type actions = 'create' | 'patch' | 'delete';

enum userActions {
  create = `User was created`,
  addedToProject = `User was added to project`,
  removedFromProject = `User was removed from project`,
  deleted = `User was deleted` 
}

enum projectActions {
  create = `Projects was created`,
  deleted = `Project was deleted`
}

const actionsMessageGenerator = ( instanceName: string, action: string ) => {
  return ``;
};


/**s
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({tags: {key: ActionsInterceptor.BINDING_KEY}})  
export class ActionsInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ActionsInterceptor.name}`;

  
  constructor(
    @repository(LogsRepository) public logsRepository: LogsRepository,
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(ProjectRepository) public projectRepository: ProjectRepository
    ) {
  }
  

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
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    const { args, methodName } = invocationCtx;

    const httpReq = await invocationCtx.get(RestBindings.Http.REQUEST, {optional: true,});
    const httpRes = await invocationCtx.get(RestBindings.Http.RESPONSE, {optional: true});

    const actionsEntities = {
      users: { userActions, repository: this.userRepository },
      projects: { projectActions, repository: this.projectRepository }
    };
  
    try {
      // Add pre-invocation logic here
      if (httpReq) {
        console.log('Endpoint being called:', httpReq.path);
      }

      const entityName = httpReq?.baseUrl.split('/')[1];
      
      console.log("args", args);
      if (args.length > 0) {
        const when = Date.now();
        const date = new Date();

        const literalDate = `| ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} at ${date.getUTCHours()}:${date.getMinutes()}`
        const action: string = `Instance of ${invocationCtx.targetClass.name} ${
          args[0]?.name || "unknown"
        } was ${methodName}d ${literalDate}`;

        console.log(action); 

        this.logsRepository.create({ action: methodName, date: when, msg: action, instanceId: args[0]?.id });
      }

      const result = await next();
     
      if(entityName) {

      httpRes?.on('finish', async () => {
        if(!args[0].id ) {
          const repository = actionsEntities[entityName as keyof typeof actionsEntities].repository;
          const instance = await repository.findOne({where: {name: args[0].name}});
        } else {

        }
      });

      }
      // Add post-invocation logic here

      console.log("postArgs", args);
      console.log("postRes", httpRes?.finished,);
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
