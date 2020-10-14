/**
 * EndpointArray.
 *
 * @param  {epts}  epts -> express endpoints list
 * @return {promise} promise -> status of db operation
 */
module.exports.ListEndpoints = function (epts) {
    return new Promise((res, rej) => {
        let routes = [];
        try {
            routes.push(`M: Method - P: Path`);
            routes.push('==================================================');
            for (const r in epts) {
                let route = epts[r];
                let methods = route.methods
                for (const m in methods) {
                    let method = methods[m];
                    let methodName = method;
                    routes.push(`M: ${methodName.padEnd(6, ' ')} - P: ${route.path}`);
                }
            }
            res(routes);
        } catch (ex) {
            rej(ex);
        }
    })
}
