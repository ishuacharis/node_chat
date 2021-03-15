const passport  = require('passport');
const jwt  = require('jsonwebtoken');
const { jwt_secret } = require("../config");
const User =  require("../models/user");


module.exports = {

    login(req, res, next) {
        passport.authenticate("login", async (err, user, info) => {

            try {
                
                if(err || !user) {
                    const error  = new Error(info.message);
                    return res.status(401).json(info);
                }

                req.login(
                    user, { session: false },
                    async (error) => {
                        if(error) return next(error);
                        const body = {
                            _id: user._id,
                            phoneNo: user.phone_no,
                            username: user.username,
                            created_at: user.created_at,
                            updated_at: user.updated_at
                        };
                        const token  =  jwt.sign({user: body}, jwt_secret)
                        return res.status(200).json({
                            user: body,
                            token: token,
                            message: "Logged in"
                        })
                    }
                )

            } catch (error) {
                return next(error)
            }

        })(req,res, next)
    },
    register(req,res,next) {

        passport.authenticate('register', {session: false},
        async(err, user, info) => {

            try {
                
                if( err || !user) {
                    const error  = new Error(info)

                    if(err) return res.status(500).json(info)
                    if(!user) return res.status(403).json(info)
                    return next(error)
                } else{
                    const body = {
                        _id: user._id,
                        phoneNo: user.phone_no,
                        username: user.username,
                        created_at: user.created_at,
                        updated_at: user.updated_at
                    }
                    const token = jwt.sign({user: user}, jwt_secret);
                    res.status(201).json({
                        user: body, token: token, message: "Registered successfully"
                    })
                }


            } catch (error) {
                return next(error)
            }


        })(req,res,next)


    }

}