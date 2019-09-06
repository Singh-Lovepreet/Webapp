const cookieParser = require('cookie');
const CONFIG = require('config');


function callAPI(req, res, apiMethod, apiMethodString) {
    let params = {};
    if (req.method.toLowerCase() === 'get') { params = req.params; }
    if (['put', 'post'].includes(req.method.toLowerCase())) { params = req.params; params.post = req.body; }
    params.headers = req.headers;


    params.query = req.query;
    params.middlewareStorage = req.middlewareStorage;

    apiMethod(params)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            let stack = error.stack;
            if(!(Object.prototype.toString.call(error) === '[object Object]')) {
                error = {success : false, error : error.toString()};
                if(CONFIG.envType && CONFIG.envType !== "production") {
                    error.stack = stack;
                }
            }
            try {
                console.logger.error(JSON.stringify(error));
            } catch (err) {
                console.logger.error('error in logging');
            }
            let code = 500;
            if (error.code) {
                code = error.code;
            }
            res.status(code).send(error);
        });
}

exports.callAPI = callAPI;