const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    fname : {
        type : String,
        required : true
    },
    sname : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    role:{
        type : String,
        required:true
    },
    club:{
        type: Schema.Types.ObjectId,
        ref:'Club'
    },
    accessLvL:{
        type : String,
        required:true
    }
})

const userModel = model('User', UserSchema);
module.exports = userModel;
