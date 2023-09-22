const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

email:{
    type:String,
    required:true,
    unique: true,
},
studentAssigned:[{
    studentID:{
     type:String,
 
        default:null,
    },
studentName:{
    type:String,
    required:true,
    default:null,
},
   

}]






})
module.exports=mongoose.model("mentor",mentorSchema)
