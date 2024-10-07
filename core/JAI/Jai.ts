import type { JaiOptions } from "../../config/JaiOptions.ts";
import { MetaData } from "../../config/MetaData.ts";
import { Inject } from "../../decorators/dependencies/Inject.ts";
import {
  type IRoutesHandling,
  RoutesHandling,
  ServiceLocator,
  type IAppFactory,
  Route,
  RouterHandlingOptons,
} from "../index.ts";
import { AppFactory } from "../createApp/AppFactory.ts";
import { MetadataControllerKeys } from "../../decorators/const/consts.ts";
import { Reflect } from "@dx/reflect";
import { Apps } from "../../config/AppsEnum.ts";

@Inject(AppFactory, RoutesHandling)
export class JAI {
  private readonly app: any | undefined;
  private readonly appName: Apps;
  private readonly routesHandler: IRoutesHandling | undefined;

  constructor(
    options: JaiOptions,
    factory?: IAppFactory,
    routesHandler?: IRoutesHandling
  ) {
    this.app = factory?.createApp(options.app);
    this.appName = options.app;
    this.routesHandler = routesHandler;
    this.defineRoute();
    factory?.start(this.app);
  }

  private getApplicationControllers() {
    const controllers = ServiceLocator.getInstancesByTypeIdentifier(
      MetaData.controllerIdentifier
    );
    return controllers;
  }

  private getRoutesFromController(controller: any) {
    const routes: Route[] = Reflect.getMetadata(
      MetadataControllerKeys.pathGet,
      controller.constructor
    );

    return routes;
  }

  defineRoute() {
    const options: RouterHandlingOptons[] = [];
    const controllers = this.getApplicationControllers();
    controllers.forEach((controller) => {
      options.push({
        routes: this.getRoutesFromController(controller),
        controller: controller,
        app: this.app,
      });
    });

    options.forEach((option) => {
      this.routesHandler?.addRoutes(this.appName, option);
    });
  }
}
