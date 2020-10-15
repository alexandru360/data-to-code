const {DataTypes} = require("sequelize");

let entity = null;
module.exports.TestTableModel = (appConn, options, logger) => {
    try {
        if (!entity) {
            entity = appConn.define('test_table', {
                table_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                },
                some_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: null
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: null
                },
            }, {
                schema: options && options.schema || '',
                updatedAt: 'updated_on',
                createdAt: 'inserted_on',
                freezeTableName: true,
                syncOnAssociation: true,
            });
        }
    }catch(ex){
        logger.error(ex);
    }finally {
        return entity;
    }
}
