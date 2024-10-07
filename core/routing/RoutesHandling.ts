import { Apps, RouterApp } from "../../config/AppsEnum.ts";
import { Injectable, ServiceLocator } from "../index.ts";
import { type IRouter, Route } from "./IRouter.ts";

interface RouterHandlingOptons {
  routes: Route[];
  controller: Record<string, Function>;
  app: any;
}

interface IRoutesHandling {
  addRoutes: (app: Apps, options: RouterHandlingOptons) => void;
}

@Injectable<IRoutesHandling>()
class RoutesHandling implements IRoutesHandling {
  private getRouterHandler(app: Apps): IRouter {
    return ServiceLocator.resolve<IRouter>(RouterApp.ROUTER(app));
  }

  addRoutes(app: Apps, options: RouterHandlingOptons) {
    const router = this.getRouterHandler(app);
    const routes: Route[] = options.routes;
    router.defineRoutes(options.app, routes, options.controller);
  }
}

export { type IRoutesHandling, RoutesHandling, type RouterHandlingOptons };
