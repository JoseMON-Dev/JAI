import { Controller, Get, Inject } from "../../core/index.ts";
import {
  GreetService,
  type IGeerterService,
} from "../services/greetService.ts";
import { OtherService, type IOtherService } from "../services/otherService.ts";
import { type Context } from "hono";

@Controller("/api")
@Inject(GreetService, OtherService)
class ControllerSample {
  constructor(
    private greetService: IGeerterService,
    private otherService: IOtherService
  ) {}

  @Get("/")
  index(ctx: Context) {
    return ctx.text(this.greetService.hello());
  }

  @Get("/user2/:id")
  index2(ctx: Context) {
    return ctx.text(this.otherService.do());
  }
}

export { ControllerSample };
