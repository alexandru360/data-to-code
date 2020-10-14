const logFilePrefix = 'api-log';
let logPath = process.env.API_LOG || "./log/";
console.log("Log path:", logPath);
const logLevel = process.env.API_LOG_CONSOLE || 'all';

try {
    let logParams = {
        appenders: {
            everything: {
                type: 'dateFile',
                filename: `${logPath}/${logFilePrefix}`,
                pattern: 'yyyy-MM-dd.log',
                compress: true,
                alwaysIncludePattern: true
            }
        },
        categories: {
            default: {appenders: ['everything'], level: logLevel}
        }
    };

    let log4js = require('log4js');
    log4js.configure(logParams);
    var log = log4js.getLogger();
} catch (ex) {
    console.log("Somethig wrong with logger ...");
    console.log(ex);
}

module.exports = log;
