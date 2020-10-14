module.exports.ModelFindById = (parId, Entity, logger) => {
    return new Promise((res, rej) => {
        Entity.findAll({
            where: {
                table_id: parId
            }
        }).then((item) => {
            if (!item) {
                res('item not found');
            }
            res(item[0].dataValues);
        }).catch(ex => {
            logger.error(ex);
            rej(ex);
        });
    });
}
