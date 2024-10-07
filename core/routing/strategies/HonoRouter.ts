import { Apps, RouterApp } from "../../../config/AppsEnum.ts";
import { RegisterInstance } from "../../index.ts";
import type { IRouter, Route } from "../IRouter.ts";

@RegisterInstance<IRouter>(RouterApp.ROUTER(Apps.HONO))
class HonoRouter implements IRouter {
  defineRoutes(app: any, paths: Route[], controller: Record<string, Function>) {
    paths.forEach((route) => {
      app?.on(route.method.toUpperCase(), route.path, (...args: any[]) =>
        controller[route.handler](...args)
      );
    });
  }
}

export { HonoRouter };
