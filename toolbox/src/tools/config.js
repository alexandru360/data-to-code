const path = require('path');

module.exports.appPath = path.dirname(require.main.filename);
module.exports.cfgFile = path.join(this.appPath, 'config.json');
module.exports.options = require(this.cfgFile);
module.exports.appPathDownload = path.join(this.appPath, 'download');
module.exports.appPathConfig = path.join(this.appPath, 'config.json');
module.exports.trayAndAppIco = path.join(this.appPath, 'favicon.ico')

module.exports.writeConfig = (data = this.options) => {
	const fs = require('fs');
	try {
		fs.writeFileSync(this.appPathConfig, JSON.stringify(data, null, 4));
	} catch (ex) {
		console.error(ex.message);
	}
}
