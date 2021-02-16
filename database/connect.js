const mongoose = require('mongoose');



module.exports = function(uri, options) {


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



}