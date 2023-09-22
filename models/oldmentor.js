const mongoose=require("mongoose");
const oldmentorSchmena=mongoose.Schema({
    oldMentorName:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    },
    StudentName:{
        type:String,
        required:true
    }
});


module.exports=mongoose.model("oldmentor",oldmentorSchmena);
