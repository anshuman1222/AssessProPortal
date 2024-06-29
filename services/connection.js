var mongoose = require("mongoose");
var config = require('config');
const adminService = require("../services/admin");
//database connection
mongoose
    .connect(config.get('mongodb.connectionString'))
    .then(() => {
        console.log(
            `MongoDB connected::::::::::::::: ${mongoose.connection.host}`
        );
        adminService.addAdminIfNotFound();
    })
    .catch((err) => {
        console.log("Error connecting to database", err);
    });


module.exports = mongoose;