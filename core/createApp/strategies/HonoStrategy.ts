import { Apps } from "../../../config/AppsEnum.ts"; //
import { RegisterInstance } from "../../index.ts";
import type { IAppStrategy } from "../IAppStrategy.ts";
import { Hono } from "hono";

@RegisterInstance<IAppStrategy>(Apps.HONO)
class HonoStrategy implements IAppStrategy {
  createApp(): Hono {
    return new Hono();
  }
  start(app: Hono): void {
    Deno.serve(app.fetch);
  }
}

export { HonoStrategy };
