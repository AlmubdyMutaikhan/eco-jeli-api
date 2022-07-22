const {Schema, model} = require('mongoose');

const EventSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String
    },
    place : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true
    },
    link:{
        type : String,
        required:true
    },
    avatar: {
        type : String,
        required:true
    }
})

const eventModel = model('Event', EventSchema);
module.exports = eventModel;
