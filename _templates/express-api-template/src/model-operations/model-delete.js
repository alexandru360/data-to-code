module.exports.ModelDeleteById = (parId, Entity, logger) => {
    return new Promise((res, rej) => {
        Entity.destroy({
            where: {
                table_id: parId
            }
        }).then((item) => {
            if (!item) {
                res('item not found');
            }
            res('item deleted');
        }).catch(ex => {
            logger.error(ex);
            rej(ex);
        });
    });
}
