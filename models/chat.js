const mongoose  = require('mongoose');

const chatSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_delivered: {
        type: Boolean,
        default: false
    },
    is_read: {
        type: Boolean,
        default: false
    },
    is_sent: {
        type: Boolean,
        default: false
    },
    created_at: {
        type:  Date,
        default: Date.now
    }
});

module.exports =  mongoose.model( 'Chat', chatSchema );