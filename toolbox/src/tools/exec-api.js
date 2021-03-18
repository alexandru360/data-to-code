const Config = require("./config");
const { spawn } = require("child_process");

let externalProcess = null;
module.exports.execApi = () => {
  externalProcess = spawn(Config.options.exe, { cwd: Config.appPathDownload });
  
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
