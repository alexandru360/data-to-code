const {Sequelize} = require('sequelize');

// here we are going to return new connection every time ...
let sequelize;
module.exports.appConn = (config, Logger) => {
    try {
        const connCfg = config.dbConns.find(f => f.default);

        if (!sequelize) {
            if (!connCfg)
                throw new Error("DB onfiguration error, check the satabase configuration and try again!");
            else {
                sequelize = new Sequelize(
                    connCfg.conn.database,
                    connCfg.conn.user,
                    connCfg.conn.password,
                    {
                        host: connCfg.conn.host,
                        port: connCfg.conn.port,
                        dialect: connCfg.dialect,
                        // timezone: config.timezone, // -->Add this line. for writing to database
                        logging: msg => {
                            if (connCfg.conn.logging) {
                                Logger && Logger.debug(msg);
                            }
                        },
                        define: {
                            underscored: false,
                            freezeTableName: true,
                            syncOnAssociation: true,
                            charset: 'utf8',
                            collate: 'utf8_general_ci',
                            timestamps: connCfg.timestamps,
                            force: false,
                        },
                        pool: {
                            maxConnections: 15,
                            maxIdleTime: 30
                        },
                    });

                // This code creates all the tables in the database. Use it wisely !!
                if (connCfg.migrations) {
                    sequelize.sync().then(function () {
                        Logger.info('DB connection sucessful.');
                    }, function (err) {
                        Logger.info('DB connection error.');
                        Logger.error(err);
                    });
                }
            }
        }
    } catch (err) {
        sequelize = null;
        Logger.error(`
        Connection error
        ------------------
        ${err}
        `);
    } finally {
        return sequelize;
    }
}

