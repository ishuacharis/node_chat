const app = require("../app");
const http = require('http');
const mongoose =  require('mongoose');

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
mongoose.connect(uri, options)
.then(
    () => {
        console.log({
            connected: "Database connected"
        })
    },
    err => console.log({
        error: err
    })
);

server.listen(PORT || 3000, function() {
    console.log(`server started ${PORT || 3000}`)
})

