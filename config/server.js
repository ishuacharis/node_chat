const app = require("../app");
const http = require('http');

const {
    PORT,
} = process.env

const port  =  PORT || '4000';
app.set('port', port);
const server  = http.createServer(app)
const socket = require("../socket/socket")(server);
server.listen(PORT || 3000, function() {
    console.log(`server started ${PORT || 3000}`)
})

