const log = require('../logger');
const packageJson = require('../../package.json');

module.exports.apiVersion = () => {
    try {
        return packageJson.version;
    } catch (err) {
        log.error(err);
    }
};
