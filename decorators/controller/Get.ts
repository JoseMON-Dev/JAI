import { Reflect } from "@dx/reflect";
import { MetadataControllerKeys } from "../const/consts.ts";

function Get(param: string = "/"): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata(
      MetadataControllerKeys.pathGet,
      param,
      target,
      propertyKey
    );
  };
}

export { Get };
