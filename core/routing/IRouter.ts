import { Router } from "hono/router";
import { HttpMethodsEnum } from "../../config/HttpMethods.ts";

interface Route {
  method: HttpMethodsEnum;
  path: string;
  handler: string;
}

interface IRouter {
  defineRoutes: (
    app: any,
    paths: Route[],
    controller: Record<string, Function>
  ) => void;
}

export type { IRouter, Route };
