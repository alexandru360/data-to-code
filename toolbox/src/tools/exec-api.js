const Config = require("./config");
const { spawn } = require("child_process");

let externalProcess = null;
let cwd = null, exe = null;
module.exports.execApi = () => {
  cwd = Config.appPathDownload;
  exe = Config.options.exe;
  externalProcess = spawn(exe, { cwd: cwd });
  
  externalProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  
  externalProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  
  externalProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
