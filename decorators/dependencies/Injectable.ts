import { ServiceLocator } from "../../core/dependencies/ServiceLocator.ts";

function Injectable<T>(): ClassDecorator {
  return function (target: any) {
    const instance = new target();
    ServiceLocator.register<T>(target.name, instance);
  };
}

export { Injectable };
