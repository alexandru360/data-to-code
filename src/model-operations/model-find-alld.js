module.exports.ModelFindAll = (Entity, logger) => {
    return new Promise((res, rej) => {
        Entity.findAll({
            table_id: (item) => item > 0
        }).then((item) => {
            if (!item) {
                res('item not found');
            }
            res(item);
        }).catch(ex => {
            logger.error(ex);
            rej(ex);
        });
    });
}
