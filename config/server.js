const app = require("../app");
const http = require('http');
const database =  require('../database/connect');

const {
    PORT,
} = process.env

const port  =  PORT || '4000';
const uri = "mongodb://localhost:27017/chatapp";
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};
app.set('port', port);
const server  = http.createServer(app)
const socket = require("../socket/socket")(server);
database(uri, options)

server.listen(PORT || 3000, function() {
    console.log(`server started ${PORT || 3000}`)
})

