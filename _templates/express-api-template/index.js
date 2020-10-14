const log = require('./src/logger');
const printMessage = require('print-message');
const {appConfig} = require("./src/config");
const {appExpress} = require("./src/express/express-config");
const {apiVersion} = require("./src/helpers/api-version");
const listEndpoints = require("express-list-endpoints");

(() => {
    try {
        const config = appConfig();
        const app = appExpress();

        const {ListEndpoints} = require('./src/helpers/list-api-endpoints');
        ListEndpoints(listEndpoints(app)).then(routes => {
            // Print out a beautiful start message
            printMessage([
                `API`,
                `ver: ${apiVersion()}`,
                '',
                `Api listens on port: ${config.apiPort}`,
                `Main route /${appConfig().apiRouteMain}/`,
                ...routes,
                '',
                '© 2020 - Generated with Data To Code#'
            ]);
            //END - Print out a beautiful start message

            log.info(`Environment var: ${JSON.stringify(process.env)}`);
        });

        module.exports.app = appExpress;
    } catch (ex) {
        log.error(ex);
    }
})();
