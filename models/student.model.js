const mongoose=require("mongoose");

const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },  
isAssigned:{
    type:Boolean,
 default:false,

},


});

module.exports=mongoose.model("student",studentSchema)
