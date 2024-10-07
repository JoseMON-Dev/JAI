import { Reflect } from "@dx/reflect";
import { MetadataControllerKeys } from "../const/consts.ts";

function Post(param: string = "/"): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata(
      MetadataControllerKeys.pathPost,
      param,
      target,
      propertyKey
    );
  };
}

export { Post };
