const passport  = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require("../models/user");
const { jwt_secret } = require("../config");

passport.use('register', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'phone_no',
        passReqToCallback: true
    } 
, async(req, username, phone_no, done) => {

    try {
        
        const user = await User.findOne({username})

        if (user) {
            return done(null, false, {
                message: "Username taken"
            })
        } else {
            const user = await User.create({username,phone_no})

            return done(null, user, {
                message: 'User created'
            })
        }

    } catch (error) {
        return done(null, false, {
            message: error.message
        })
    }

}

))

passport.use('login', new localStrategy({

    usernameField: 'username',
    passwordField: 'password'

}, async(username, password, done) => {

        try {
            const user  = await User.findOne({username});
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                })
            }
            const validPassword  = await user.isValidPassword(password)
            if (!validPassword) {
                return done(null, false, {
                    message: 'Please check your password and try again'
                })
            }
            return done(null, user, {
                message: 'Logged in Succssfully'
            })
        } catch (error) {
            return done(error)
        }

}))


passport.use(
    new JWTstrategy({
        secretOrKey: jwt_secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("JWT")
    }, async(token, done) => {
        try {
            return done(null, token.user)
        } catch (error) {
            return done(error)
        }
    }
    )
)