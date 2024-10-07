import { Apps } from "../../config/AppsEnum.ts";
import { Injectable } from "../../decorators/dependencies/Injectable.ts";
import { ServiceLocator } from "../index.ts";
import { IAppStrategy } from "./IAppStrategy.ts";

export interface IAppFactory {
  createApp(App: Apps): object;
  start: (app: any) => void;
}

@Injectable()
export class AppFactory {
  private appStrategy: IAppStrategy | null;
  constructor() {
    this.appStrategy = null;
  }
  createApp(App: Apps): object {
    this.appStrategy = ServiceLocator.resolve<IAppStrategy>(App);
    return this.appStrategy.createApp();
  }

  start(app: object): void {
    this.appStrategy?.start(app);
  }
}
