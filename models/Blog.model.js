const {Schema, model} = require('mongoose');

const BlogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        required : true
    },
    date:{
        type : Date,
        default:Date.now
    },
    author:{
        type : String,
        required:true
    }
})

const blogModel = model('Blog', BlogSchema);
module.exports = blogModel;
