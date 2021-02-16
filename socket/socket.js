module.exports = function(server) {
    const io = require("socket.io")(server, {

        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST"]
        }

    });


    io.on("connection", (socket) => {
        console.log("socket connected on now ins socket file "+ socket.id)
        io.emit("hello", "world")

        socket.emit('isconnected', {
            connected: 'successfull'
        })
        socket.on("typing" , (data, callback) => {
       
            console.log(`vue data ${data.isTyping}`)

            callback({
                status: 'ok'
            })
        })
        
        socket.on('disconnected', () => {
            console.log("socket disconnected "+ socket.id)
        })
    })

    


    io.on('disconnect', function() {
        console.log("socket disconnected")
    })

    

}