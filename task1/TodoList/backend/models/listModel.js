const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    user : [ {
        type : mongoose.Types.ObjectId,
        ref : "user"
    }]
},
{timestamps : true})

const listModel = mongoose.model('lists',listSchema);

module.exports = listModel;

