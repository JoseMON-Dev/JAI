import { ServiceLocator } from "../../core/dependencies/ServiceLocator.ts";

function Inject(...keys: (new (...args: any[]) => any)[]): ClassDecorator {
  return function (target: any) {
    const originalConstructor = target;
    const newConstructor: any = function (...args: any[]) {
      const resolvedDeps = keys.map((key) => {
        const dep: object = ServiceLocator.resolve(key.name);
        return dep;
      });
      const newArgs = args.concat(resolvedDeps);
      return new originalConstructor(...newArgs);
    };

    newConstructor.prototype = originalConstructor.prototype;
    Object.defineProperty(newConstructor, "name", {
      value: originalConstructor.name,
    });

    return newConstructor;
  };
}

export { Inject };
