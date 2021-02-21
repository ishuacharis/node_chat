const app = require("../app");
const http = require('http');
const database =  require('../database/connect');
const OPTIONS = require("../database/database_options")
const {
    PORT,
} = process.env

const port  =  PORT || '4000';
const uri = "mongodb://localhost:27017/chatapp";

app.set('port', port);
const server  = http.createServer(app)
const socket = require("../socket/socket")(server);
database(uri, OPTIONS);

server.listen(PORT || 3000, function() {
    console.log(`server started ${PORT || 3000}`)
})

