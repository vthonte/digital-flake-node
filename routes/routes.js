var config = process.env;
var serviceName = config.serviceName;
// routes
module.exports = function (app) {
    app.use("/category", require("../controllers/category.controller"));
    app.use("/product", require("../controllers/product.controller"));
    app.use("/user", require("../controllers/user.controller"));
};