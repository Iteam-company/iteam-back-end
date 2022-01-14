import {
  /* inject, */
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({tags: { key: ArrayParserInterceptor.BINDING_KEY }})
export class ArrayParserInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ArrayParserInterceptor.name}`;

  /*
  constructor() {}
  */

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
    const { args } = invocationCtx;

    console.log('Context', invocationCtx);

    console.log('args', args);

    const argumentsKeys = Object.keys(args[0]).filter((key: string) => Array.isArray(args[key as keyof typeof args]));
    const arraysArgs = Object.values(args[0]).filter((arg: any) => Array.isArray(arg));
    const parsedArrays = arraysArgs.map((arr: any) => arr.join(','));

    console.log('Parsed arrays', parsedArrays, argumentsKeys);

    try {
      // Add pre-invocation logic here
      argumentsKeys.forEach((key: string, i) => args[key as keyof typeof args] = parsedArrays[i]);

      console.log("Final args", args);

      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
