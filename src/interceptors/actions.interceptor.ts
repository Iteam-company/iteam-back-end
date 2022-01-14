import {
  /* inject, */
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Logs } from '../models';
import { LogsRepository } from '../repositories';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({tags: {key: ActionsInterceptor.BINDING_KEY}})
export class ActionsInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ActionsInterceptor.name}`;

  
  constructor(@repository(LogsRepository) public logsRepository: LogsRepository) {
    
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
    // console.log("interceptor context", args);
    console.log("New worked");
    console.log("Key", ActionsInterceptor.BINDING_KEY);
    // console.log("CTX", invocationCtx, "parent", parent);
    try {
      // Add pre-invocation logic here
      console.log("args", args);
      if (args.length > 0) {
        const when = Date.now();
        const action: string = `${"Entity"} ${
          args[0]?.name || "unknown"
        } was ${methodName}d at ${when} `;

        this.logsRepository.create({ action, date: when } as Logs);
      }
      const result = await next();
      // const entityName = parent?.request.url.split('/')[1];
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
