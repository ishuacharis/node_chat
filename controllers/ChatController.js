const Chat = require("../models/chat");

module.exports = {
    singleChat(req,res,next){
        const { username } = req.params;
        return res.status(200).json({
            params: username,
            message: "Thank God"
        })
    }
}