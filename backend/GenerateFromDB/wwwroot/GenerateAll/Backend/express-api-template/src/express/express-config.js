const log = require('../logger');
const compression = require("compression");
const helmet = require("helmet");
const nocache = require('nocache');
const bodyParser = require('body-parser');
const express = require("express");
const {appConfig} = require("../config");

module.exports.appExpress = () => {
    try {
        const config = appConfig();
        const app = express();
        app.use(bodyParser.urlencoded({extended: false}));

        //Added compression response and helmet
        app.use(compression());
        app.use(helmet());

        // Disable X-Powered-By header
        app.disable('x-powered-by');
        // No cashing
        app.use(nocache());

        // Route mappings
        // =====================================================================================================
        const appConfigApiRoutes = () => {
            log.info(`Loading routes`);
            try {
                const mainUrl = `/${config.apiRouteMain}/`;
                for (let i = 0; i < config.publicRoutes.length; i++) {
                    let itm = config.publicRoutes[i];
                    let req = require('path').join(process.cwd(), itm.path);
                    let route = require(req);
                    let path = `${mainUrl}${itm.name}`;
                    app.use(path, route);
                    log.info(`Loading route ${path} -> ${itm.path}.js`);
                }
                log.info(`Routes loaded successful`);
            } catch (ex) {
                console.error("Error loading routes:");
                console.error(ex);
            }
        };

        appConfigApiRoutes(); // Load the routes...
        // =====================================================================================================
        // End - Route mappings

        app.listen(config.apiPort || 3000);

        log.info(`Program started !`);
        log.info(`Api listens on port ${config.apiPort}`);

        return app;
    } catch (ex) {
        log.error(ex);
    }
};
