const Config = require("./config");

module.exports.DeleteDirContent = () => {
  const fsExtra = require("fs-extra");
  fsExtra.emptyDirSync(Config.appPathDownload);
}
