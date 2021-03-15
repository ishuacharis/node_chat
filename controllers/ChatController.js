const Chat = require("../models/chat");
const User = require("../models/user");

module.exports = {
    singleChat(req,res,next){
        const { username } = req.params;
        return res.status(200).json({
            params: username,
            message: "Thank God"
        })
    },

    async addUser(req,res,next) {

        const { username, user } =  req.body;
        
        const record = await User.findOne({username});

        if(!record) {
            return res.status(404).json({"message": "User not found"});

        }
        else{
            const filter = {_id: user};
            const update = {$addToSet: { friends: record._id } };
            const doc =  await User.findOneAndUpdate(filter,update, {new: true,useFindAndModify: false})
            
            if(!doc) {
                return res.status(500)
                .json({
                    "message": "Internal Server error"
                })
            }

            return res.status(200)
            .json({
                "message": "Updated successfully",
                "doc": doc
            })
        }


    }
}

