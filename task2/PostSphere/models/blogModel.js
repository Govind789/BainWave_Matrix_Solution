const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    story: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    image : {
        path : {
            type : String,
            required : true
        },
        filename : {
            type : String,
            required : true
        },
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    comments : [{
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users',
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