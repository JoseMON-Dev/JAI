interface IAppStrategy {
  createApp: () => object;
  start: (app: any) => void;
}

export type { IAppStrategy };
