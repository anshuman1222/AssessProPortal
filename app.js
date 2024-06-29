var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const helmet = require('helmet')
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var passport = require("./services/passportconf.js");
var app = express();
const cors = require('cors');
app.use(helmet());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin");
    next();
});
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOptions));
app.use(expressValidator());
require("./services/connection");
var publicRoutes = require("./routes/public");
var login = require("./routes/login");
var adminLogin = require('./routes/adminLogin');
var admin = require('./routes/admin');
var user = require('./routes/user');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'express-session secret' }))
app.use(passport.initialize());
app.use(passport.session());

//bind routes
app.use('/api/public', publicRoutes);
app.use('/api/login', login);
app.use('/api/adminlogin', adminLogin);
app.use('/api/admin', passport.authenticate('admin-token', { session: false }), admin);
app.use('/api/user', passport.authenticate('user-token', { session: false }), user);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(function (req, res, next) {
    next(createError(404, "Invalid API. Use the official documentation to get the list of valid APIS."));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status).json({
        success: false,
        message: err.message
    });
});


module.exports = app;