const { PayloadTooLarge } = require("http-errors");

module.exports = function(server) {
    const io = require("socket.io")(server, {
        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST"]
        }
    });
    const users  = {};
    const typers = [];

    io.on("connection", (socket) => {
        console.log({
            info: "socket connected on now ins socket file "+ socket.id,
            id: socket.id
        })
        io.emit("hello", "world")

    
        socket.on("typing" , (data, callback) => {
       
            console.log(`vue data ${data.isTyping}`)

            callback({
                status: 'ok'
            })
        })

         //listen to new user
         socket.on('new_user', ({username}) => {
            users[socket.id] =  {
                id: socket.id,
                username: username
            }
            console.log({
                users: users,
                totalusers: Object.keys(users).length
            })
        })

        //listen to user typing
        socket.on('user_typing' , (data) => {
            typers[socket.id] = 1
            socket.broadcast.emit("user_typing" , {
                user: users[socket.id].username,
                typers: Object.keys(typers).length
            })      
           
        })

        //listen to user stopped typing
        socket.on('user_stopped_typing', () => {
            console.log('not yping')
            delete typers[socket.id]
            socket.broadcast.emit('user_stopped_typing',Object.keys(typers).length)
        })

        
        //listen to socket disconnection
        socket.on('disconnected', () => {
            console.log("socket disconnected "+ socket.id)
        })
    })

    


    io.on('disconnect', function() {
        console.log("socket disconnected")
    })

    

}