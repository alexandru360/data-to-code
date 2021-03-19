const isDev = require("electron-is-dev");
const fs = require("fs");
const path = require("path");

module.exports.appPath = isDev ?
  path.dirname(require.main.filename) : path.dirname(process.execPath);
module.exports.appPathDownload = path.join(this.appPath, "download");
module.exports.appPathConfig = path.join(this.appPath, "config.json");
module.exports.trayAndAppIco = path.join(this.appPath, "favicon.ico");
module.exports.options = require(this.appPathConfig);
module.exports.isExeDownloaded = () =>
  fs.existsSync(require("path").join(this.appPathDownload, this.options.exe));

module.exports.writeConfig = (data = this.options) => {
  const fs = require("fs");
  try {
    fs.writeFileSync(
      this.appPathConfig,
      JSON.stringify(data, null, 4)
    );
  } catch (ex) {
    console.error(ex.message);
  }
};
