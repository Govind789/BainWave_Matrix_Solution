const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    heading : {
        type : String,
        required : true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    comments : [{
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : user,
            required : true
        },
        content : {
            type : String,
            required : true,
        },
        timestamp : {
            type : Date,
            default : Date.now
        }
    }]
})

const blogModel = mongoose.model('blogs',blogSchema);

module.exports = blogModel;