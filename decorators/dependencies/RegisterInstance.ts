import { ServiceLocator } from "../../core/dependencies/ServiceLocator.ts";

function RegisterInstance<T>(dependencyKey: string): ClassDecorator {
  if (
    dependencyKey?.trim() == "" ||
    dependencyKey == undefined ||
    dependencyKey == null
  ) {
    throw new Error("Invalid Dependency Identifyer");
  }
  return function (target: any) {
    const instance = new target();
    ServiceLocator.register<T>(dependencyKey, instance);
  };
}

export { RegisterInstance };
