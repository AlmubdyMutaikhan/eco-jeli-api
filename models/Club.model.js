const { Schema, model } = require('mongoose');

const ClubSchema = new Schema({
    leader : {
        type : Schema.Types.ObjectId,
    },
    city : {
        type : String,
        default:'Караганда'
    },
    name : {
        type : String,
        default:'Эко-название'
    },
    logo : {
        type : String,
        default:'https://images.unsplash.com/photo-1635802270753-00ba6b11f3fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGVjb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    description : {
        type : String,
        default:'Тут должна быть ваше описание'
    },
    members : [{
            fname : {
                type : String,
                required : true 
            },
            sname : {
                type : String,
            },
            role : {
                type : String,
                required:true
            },
            email:{
                type : String
            },
            phone:{
                type:String
            }
    }]
})

const ClubModel = model('Club', ClubSchema);
module.exports = ClubModel;