var mqserver = require('../model/mqserver')

exports.assignRoutes = function (app) {
    app.get('/',  mqserver.status);
}
