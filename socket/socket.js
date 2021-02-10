module.exports = function(server) {
    const io = require("socket.io")(server, {

        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST"]
        }

    });

    io.on('connection', (socket) => {

        console.log("connected to socket")
    })

    io.on('disconnect', function() {
        console.log("socket disconnected")
    })

    io.on("connection", (socket) => {
        console.log("socket connected on now ins socket file "+ socket.id)
        socket.emit('isconnected', {
            connected: 'sucessfull'
        })
        socket.on("user" , function() {
            console.log("working")
        })
        
        socket.on('disconnect', () => {
            console.log("socket disconnected ")
        })
    })

}