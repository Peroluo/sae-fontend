import koaStatic from "koa-static";
import path from "path";
export const addBodyParser = (app) => {
  app.use(koaStatic(path.join(__dirname, "../../www")));
};
