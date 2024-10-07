import { Reflect } from "@dx/reflect";
import { MetadataControllerKeys } from "../const/consts.ts";
import { MetaData } from "../../config/MetaData.ts";
import { Route, ServiceLocator } from "../../core/index.ts";
import { HttpMethodsEnum } from "../../config/HttpMethods.ts";

function Controller(basePath: string = "/"): ClassDecorator {
  return function (target: any) {
    const instance = new target();
    const httpGetHandlers = getHandlers(
      MetadataControllerKeys.pathGet,
      basePath,
      instance
    );
    Reflect.defineMetadata(
      MetadataControllerKeys.pathGet,
      httpGetHandlers,
      instance.constructor
    );
    Reflect.defineMetadata(MetadataControllerKeys.basePath, basePath, target);
    Reflect.defineMetadata(
      MetaData.typeIdentifierKey,
      MetaData.controllerIdentifier,
      instance
    );

    ServiceLocator.register(target.name, instance);
  };
}

function getHandlers(
  pathKey: MetadataControllerKeys,
  basePath: string,
  instance: any
): (Route | undefined)[] {
  const methodKeys = Object.getOwnPropertyNames(
    instance.constructor.prototype
  ).filter((m) => m !== "constructor");
  return methodKeys.reduce((acc, methodName) => {
    const route = Reflect.getMetadata(pathKey, instance, methodName);
    if (route) {
      acc.push({
        path: basePath + route.trim(),
        handler: methodName,
        method: HttpMethodsEnum.GET,
      });
    }
    return acc;
  }, [] as Route[]);
}

export { Controller };
