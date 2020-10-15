const log = require("./logger");

let appConfig = null;
module.exports.appConfig = () => {
    try {
        if (!appConfig) {
            let envConfig = process.env.API_CONFIG;
            console.log("Config file(env API_CONFIG): ", envConfig);

            if (envConfig) {
                try {
                    appConfig = require(envConfig);
                    log.info(`Configuration from file: ${envConfig}`);
                    log.info(`File content: ${JSON.stringify(appConfig)}`);
                } catch (err) {
                    console.log("No config file provided or in local folder!");
                    log.info("Reading the app-config.json from env");
                    log.error(err);
                }
            } else {
                try {
                    appConfig = require('../app-config');
                    const message = "Reading the app-config.json local.";
                    console.log(message);
                    log.info(message);
                    log.info(`File content: ${JSON.stringify(appConfig)}`);
                } catch (err) {
                    console.log("No config file provided or in local folder!");
                    log.info("Reading the app-config.json local");
                    log.error(err);
                    process.exit(1);
                }
            }
        }
    } catch (err) {
        appConfig = null;
        console.error(err);
    } finally {
        return appConfig;
    }
}
