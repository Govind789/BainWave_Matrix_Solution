const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true,
    },
    profileImage: {
        type: String,
        required: false,
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
        required : true 
    }]
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;