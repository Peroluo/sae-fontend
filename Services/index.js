import Koa from "koa";
import chalk from "chalk";
import config from "./config";
import R from "ramda";
import { join } from "path";
import createSocketServer from "./socket";
global.config = config;

// 全局中间件的执行顺序
const middlewares = ["static", "bodyParser", "log", "router"];

const useMiddlewares = (app) => {
  const joinPathName = (moduleName) =>
    join(__dirname, `./middleware/global/${moduleName}`);

  const requirePath = (pathName) => require(pathName);

  // R.forEachObjIndexed：把require取得的每一个函数执行
  const useMiddleware = R.forEachObjIndexed((middlewaresUseByApp) =>
    middlewaresUseByApp(app)
  );

  // R.compose从右向做执行函数，返回值是下一个函数的参数
  const Rcompose = R.compose(useMiddleware, requirePath, joinPathName);
  // R.map把middlewares作为参数，执行Rcompose的第一个函数
  R.map(Rcompose)(middlewares);
};

async function start() {
  const app = new Koa();

  await useMiddlewares(app);

  const server = createSocketServer(app);

  server.listen(global.config.port, () => {
    console.log(
      process.env.NODE_ENV === "development"
        ? `Open ${chalk.green("http://localhost:" + global.config.port)}`
        : `App listening on port ${global.config.port}`
    );
  });
}

start();
