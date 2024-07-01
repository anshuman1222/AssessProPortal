const jwt = require('jsonwebtoken');

var config = require('config');

var passport = require('./passportconf');

var userModel = require('../models/user');

var tool = require('./tool');

var userLogin = (req, res, next) => {

    req.check('email', 'Invalid email address').isEmail().notEmpty();
    req.check('password', 'Invalid password').isLength({ min: 4, max: 20 });

    var errors = req.validationErrors();

    if (errors) {
        res.json({
            success: false,
            message: 'Invalid inputs',
            errors: errors
        })
    }
    else {
        passport.authenticate('login', { session: false }, (err, user, info) => {
            if (err || !user) {
                res.json(info);
            }
            else {
                req.login({ _id: user._id }, { session: false }, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'server error'
                        });
                    }

                    var token = jwt.sign({ _id: user._id }, config.get('jwt.secret'), { expiresIn: '1d' });
                    res.json({
                        success: true,
                        message: 'login successful',
                        user: {
                            username: user.username,
                            type: user.usertype,
                            _id: user._id,
                            email: user.email
                        },
                        token: token
                    })
                })
            }
        })(req, res, next);
    }
}

var userDetails = (req, res, next) => {
    if (req.user) {
        res.json({
            success: true,
            user: {
                username: req.user.username,
                type: req.user.usertype,
                _id: req.user._id,
                email: req.user.email
            }
        });
    }
    else {
        res.json({
            success: false,
            user: {}
        });
    }
}

var changePassword = (req, res, next) => {

    req.check('userid', 'Empty User Id').notEmpty();
    req.check('password', 'Invalid password').isLength({ min: 4, max: 20 });

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).json({
            success: false,
            message: 'Invalid inputs',
            errors: errors
        })
    }
    else {
        var userid = req.body.userid;
        var password = req.body.password;

        tool.hashPassword(password)
            .then((hash) => {
                userModel.findOneAndUpdate({
                    _id: userid
                },
                    {
                        password: hash
                    }).then(() => {
                        res.json({
                            success: true,
                            message: "Password changed successfully."
                        })
                    }).catch((err) => {
                        res.status(500).json({
                            success: false,
                            message: "Unable to change Password"
                        })
                    })
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: "Unable to change Password"
                })
            })
    }  
}

module.exports = { userLogin, userDetails , changePassword};