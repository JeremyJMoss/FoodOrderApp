const path = require("path");

module.exports.renderAdminProductPage = function(req, res){
    res.status(200).sendFile(path.join(__dirname, "..", "views", "addProduct.html"));
}