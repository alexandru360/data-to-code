const {ModelDeleteById} = require("../model-operations/model-delete");
const {ModelFindAll} = require("../model-operations/model-find-alld");
const {ModelFindById} = require("../model-operations/model-find");
const {appConn} = require("../helpers/app-connection");
const {ModelBulkUpsert} = require("../model-operations/model-upsert");
const {TestTableModel} = require("../models/test-model");
const {appConfig} = require("../config");

const getAppConn = (connection, logger) => {
    const config = appConfig();
    return connection ? connection : appConn(config, logger);
}

/**
 * ModelUpsertService.
 *
 * @param  {content}  content -> insert/update
 * @param  {connection}  connection to instantiate the model
 * @param  {schema} schema -> database
 * @param  {logger} logger
 * @return {promise} promise -> status of db operation
 */
module.exports.ModelUpsertService = (content, connection, schema, logger) => {
    return new Promise((res, rej) => {
        const conn = getAppConn(connection, logger);

        logger.info("Entity - Mapping data to object");
        let obj = {
            some_id: content.some_id,
            name: content.name
        }

        const Entity = TestTableModel(conn, null, logger);
        logger.info("Entity - Upsert");
        let arr = [];
        arr.push(obj);
        if (Entity)
            return ModelBulkUpsert(arr, Entity, logger, schema).then((r) => res(r)).catch((ex) => rej(ex));
        else
            throw new Error('Entity could not be created; check ModelUpsertService');
    });
}

/**
 * ModelFindService.
 *
 * @param  {connection}  connection to instantiate the model
 * @param  {schema} schema -> database
 * @param  {logger} logger
 * @return {promise} promise -> status of db operation
 */
module.exports.ModelFindService = (connection, schema, logger) => {
    return new Promise((res, rej) => {
        const conn = getAppConn(connection, logger);
        const Entity = TestTableModel(conn, null, logger);
        if (Entity)
            return ModelFindAll(Entity, logger, schema).then((r) => res(r)).catch((ex) => rej(ex));
        else
            throw new Error('Entity could not be created; check ModelUpsertService');
    });
}

/**
 * ModelFindByIdService.
 *
 * @param  {parId}  parId -> id of record searched
 * @param  {connection}  connection to instantiate the model
 * @param  {schema} schema -> database
 * @param  {logger} logger
 * @return {promise} promise -> status of db operation
 */
module.exports.ModelFindByIdService = (parId, connection, schema, logger) => {
    return new Promise((res, rej) => {
        const conn = getAppConn(connection, logger);
        const Entity = TestTableModel(conn, null, logger);
        if (Entity)
            return ModelFindById(parId, Entity, logger, schema).then((r) => res(r)).catch((ex) => rej(ex));
        else
            throw new Error('Entity could not be created; check ModelUpsertService');
    });
}

/**
 * ModelDeleteByIdService.
 *
 * @param  {parId}  parId -> id of record searched
 * @param  {connection}  connection to instantiate the model
 * @param  {schema} schema -> database
 * @param  {logger} logger
 * @return {promise} promise -> status of db operation
 */
module.exports.ModelDeleteByIdService = (parId, connection, schema, logger) => {
    return new Promise((res, rej) => {
        const conn = getAppConn(connection, logger);
        const Entity = TestTableModel(conn, null, logger);
        if (Entity)
            return ModelDeleteById(parId, Entity, logger, schema).then((r) => res(r)).catch((ex) => rej(ex));
        else
            throw new Error('Entity could not be created; check ModelUpsertService');
    });
}
