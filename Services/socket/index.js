import http from "http";
import socket from "socket.io";
import nexpect from "nexpect";
import iconv from "iconv-lite";
import path from "path";
// createSocketServer 创建实时通信服务
function createSocketServer(app) {
  const server = http.createServer(app.callback());

  const io = socket(server);

  io.on("connection", function (socket) {
    socket.on("startBuild", function (id) {
      runShell(socket, "buildMsg");
    });
  });
  return server;
}

// 执行shell脚本
function runShell(socket, event) {
  const func = (msg) => {
    socket.emit(event, msg);
  };
  const cmd = [
    "cd ./APP",
    "cd ./NSP",
    "cnpm install -d",
    "docker build -t saedemonew:latest .",
    "cd ../",
    "docker-compose stop saedemo",
    "docker-compose up -d saedemo",
  ];
  run(cmd, "./", func);
}

// 执行shell方法
function run(cmd, dir = "./", func) {
  const setConsoleToClient = func;
  if (cmd.length > 0) {
    const [runCmd] = cmd;
    // 记录执行的命令
    setConsoleToClient(runCmd);
    const hasDir = runCmd.includes("cd ");
    if (hasDir) {
      const cwd = runCmd.split("cd ");
      dir = path.join(dir, cwd[1]);
      const newCmd = cmd.splice(1);
      if (newCmd.length > 0) {
        run(newCmd, dir, func);
      } else {
        setConsoleToClient("构建已完成！");
      }
    } else {
      const runShell = nexpect
        .spawn(runCmd, { cwd: dir, env: "dev" })
        .run(function (err) {
          if (!err) {
            const newCmd = cmd.splice(1);
            if (newCmd.length > 0) {
              run(newCmd, dir, func);
            } else {
              setConsoleToClient("构建已完成！");
            }
          } else {
            setConsoleToClient(err);
          }
        });
      runShell.stdout.on("data", (data) => {
        setConsoleToClient(iconv.decode(data, "gbk"));
      });
    }
  } else {
    setConsoleToClient("没有可执行的构建！", conn);
  }
}

export default createSocketServer;
