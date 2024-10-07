enum Apps {
  HONO = "HONO",
}

const RouterApp = {
  ROUTER: (app: Apps) => `${app}-ROUTER`,
};

export { Apps, RouterApp };
