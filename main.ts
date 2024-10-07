import { JAI } from "./core/index.ts";

import { Apps } from "./config/AppsEnum.ts";
import { ControllerSample } from "./example/controllers/sampleController.ts";
import { GreetService } from "./example/services/greetService.ts";
import { OtherService } from "./example/services/otherService.ts";

new JAI({
  app: Apps.HONO,
  appOptions: {
    controllers: [ControllerSample],
    services: [GreetService, OtherService],
  },
});
