const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs' 
    }]
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;