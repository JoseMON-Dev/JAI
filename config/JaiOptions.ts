import type { Apps } from "./AppsEnum.ts";
interface JaiOptions {
  app: Apps;
  appOptions?: AppOptions;
}

interface AppOptions {
  controllers?: object[];
  services?: object[];
  middlewares?: MiddlewaresOptions;
}

interface MiddlewaresOptions {
  startRoutesMiddlewares: object[];
  EndRoutesMiddlewares: object[];
  startRouteMiddlewares: RouteMiddleware[];
  EndRouteMiddlewares: RouteMiddleware[];
}

interface RouteMiddleware {
  route: string;
  handler: object;
}

export type { JaiOptions, AppOptions, MiddlewaresOptions, RouteMiddleware };
