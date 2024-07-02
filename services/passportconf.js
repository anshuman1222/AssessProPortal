var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

const bcrypt = require('bcrypt');
const saltRounds = 10;

var config = require('config');

var userModel = require('../models/user');
var adminModel = require('../models/admin');

var localStrategyOption = {
  usernameField: 'email',
  passwordField : 'password',
  passReqToCallback : true
}

async function localStrategyVerify(req, email, password, done) {
  try {
    const user = await userModel.findOne({ email });

    // user not found
    if (!user) {
      return done(null, false, {
        success: false,
        message: 'email is not registered'
      });
    }

    // account is blocked
    if (user.status === false) {
      return done(null, false, {
        success: false,
        message: 'your account is blocked'
      });
    }

    // check for password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return done(null, user, {
        success: true,
        message: 'logged in successfully'
      });
    } else {
      return done(null, false, {
        success: false,
        message: 'invalid credential'
      });
    }
  } catch (err) {
    // database server error
    return done(err, false, {
      success: false,
      message: 'server error'
    });
  }
}

var localStrategy = new LocalStrategy(localStrategyOption, localStrategyVerify);

passport.use('login',localStrategy);


var jwt_options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : config.jwt.secret
}

async function jwtStrategyVerify(jwt_payload, done) {
  try {
    const user = await userModel.findById(jwt_payload._id);

    if (user) {
      return done(null, user, {
        success: true,
        message: "Successful",
      });
    } else {
      return done(null, false, {
        success: false,
        message: "Authorization Failed",
      });
    }
  } catch (err) {
    return done(err, false, {
      success: false,
      message: "Server error",
    });
  }
}

var jwtStrategy = new JwtStrategy(jwt_options, jwtStrategyVerify);

passport.use('user-token',jwtStrategy);

var localStrategyOptionAdmin = {
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
}

async function authenticateAdmin(req,username, password, done) {
  try {
    // Find the admin by username
    const admin = await adminModel.findOne({ username }).exec();

    // Admin not found
    if (!admin) {
      return done(null, false, {
        success: false,
        message: 'admin not found'
      });
    }

    // Check the password
    const result = await bcrypt.compare(password, admin.password);

    if (result) {
      return done(null, admin, {
        success: true,
        message: 'logged in successfully'
      });
    } else {
      return done(null, false, {
        success: false,
        message: 'invalid credential'
      });
    }
  } catch (err) {
    // Handle database server error
    return done(err, false, {
      success: false,
      message: 'server error'
    });
  }
}

var localStrategyAdmin = new LocalStrategy(localStrategyOptionAdmin, authenticateAdmin);

passport.use('admin-login',localStrategyAdmin);

async function jwtStrategyVerifyAdmin(jwt_payload, done) {
  try {
    const admin = await adminModel.findById(jwt_payload._id);

    if (admin) {
      return done(null, admin, {
        success: true,
        message: 'successful'
      });
    } else {
      return done(null, false, {
        success: false,
        message: 'Authorization failed'
      });
    }
  } catch (err) {
    // database server error
    return done(err, false, {
      success: false,
      message: 'erver error'
    });
  }
}

var jwtStrategyAdmin = new JwtStrategy(jwt_options, jwtStrategyVerifyAdmin);

passport.use('admin-token', jwtStrategyAdmin);

module.exports = passport;