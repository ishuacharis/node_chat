const dotenv  = require('dotenv')
dotenv.config()
module.exports ={
    node_env: process.env.NODE_ENV,
    jwt_secret: process.env.JWTSECRET
}