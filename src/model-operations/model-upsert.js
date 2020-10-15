module.exports.ModelBulkUpsert = (obj, Entity, logger, schema) => {
    return new Promise((res, rej) => {
        Entity.bulkCreate(obj,
            {
                benchmark: true,
                searchPath: schema || '',
                updateOnDuplicate: ["some_id", "name"]
            }
        ).then((data) => {
            res(`Entity-bulk-${data["0"] && data["0"].isNewRecord ? 'insert' : 'update'}`);
        }).catch(err => {
            logger.error(err);
            rej(err);
        });
    });
}
