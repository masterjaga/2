const express= require("express");
const mentor=require("../models/mentor.model")

const router=express.Router();
const student=require("../models/student.model")

const oldmentor=require("../models/oldmentor")
 router.get("/",(req,res)=>{
    res.status(200).send({
        message:"welcome to mentor and student assinging with Database"
    })
 })
router.get("/mentor",(req,res)=>{
 mentor.find({}).then((data)=>res.status(200).send({messasage:"all mentor are successfully retrived",data:data}))
})



router.post("/create/mentor",async(req,res)=>{
    
    try{
        let newMentor=new mentor(req.body);

       
        await newMentor.save().then((data)=>{
            res.status(201).send({message:"successfully mentor created",mentor:data})
        }).catch((er)=>{
            res.status(401).send({message:"error while aading new mentor"})
        })

      

    }catch(er){
        res.status(500).send({message:"inrternal server error"})
    }
    
})


router.post("/mentor/studentsAssined",async(req,res)=>{
    try{
        let {studentId,mentorId}=req.body
     
        if(!studentId||!mentorId){
            return res.status(200).send({message:"studentId and mentorId is required"})
        }
        let particularStudent=await student.findOne({_id:studentId})

       
       

        if(!particularStudent.isAssigned){
            let newStudent=await student.findByIdAndUpdate({_id:studentId},{$set:{isAssigned:true}})
  
            let mentorDetails=await mentor.findById({_id:mentorId})
        console.log(newStudent)
            if(!newStudent||!mentorDetails){
                return res.status(404).send({message:"invalid details"})
            }
        let result=await mentor.findByIdAndUpdate({_id:mentorDetails._id},{$addToSet:{
            studentAssigned:{
                studentID:particularStudent._id,
                studentName: newStudent.name}}}).then(data=>{
                    res.status(201).send({message:"successfully assigned students",mentorName:mentorDetails.name,studentName:particularStudent.name,studentid:particularStudent._id})
                })
        }
       
    }catch(er){
res.status(500).send({message:"Internal error "})
    }
});

//change mentor to particular student

router.post("/mentorChange/particularStudent",async(req,res)=>{
const {studentId,oldMentorId,newMentorId}=req.body

const studentDetails=await student.findOne({_id:studentId})
const oldMentorDetails= await mentor.findOne({_id:oldMentorId})
const newMentorDetails=await mentor.findOne({_id:newMentorId})

if(!studentDetails||!oldMentorDetails||!newMentorDetails){
    return res.status(404).send({message:"invalid details"})
}


    let removeStudent=await mentor.findByIdAndUpdate({_id:oldMentorDetails._id},{$pull:{studentAssigned:{studentID:studentDetails._id}}})

    if(removeStudent){


let updatedstudent= student.findByIdAndUpdate({_id:studentDetails._id},{$set:{isAssigned:false}})
  
if(updatedstudent){
const mentorchanged=await mentor.findOneAndUpdate({_id:newMentorDetails._id},{$addToSet:{
    studentAssigned:{
        studentID:studentDetails._id,
        studentName: studentDetails.name}
}})
if(mentorchanged){
let updateOldMentor=new oldmentor({oldMentorName:oldMentorDetails.name,studentId:studentDetails._id, StudentName:studentDetails.name})
await updateOldMentor.save()
res.status(201).send({message:"successfully mentor changed",oldMentor:oldMentorDetails.name,newMenor:newMentorDetails.name})
}
}  }
})

//show students for particulat mentor
router.get("/showstudent/particularmentor",async(req,res)=>{
    
    const {mentorId}=req.body
    if(!mentorId){
        return res.status(400).send({message:"mentorId required"})
    }
   const mentorDetails=await mentor.findOne({_id:mentorId})
  if(!mentorDetails.studentAssigned.length){
    return res.status(404).send({message:"no students are assinged"})
  }

 res.status(200).send({message:"student successfully retrived",data:mentorDetails.studentAssigned})

})

router.get("/oldmentor/particularStudent",async(req,res)=>{
const {studentId}=req.body


if(!studentId){
    return res.status(404).send({
        message:"studentId required"
    })
}

if(studentId){
    let oldMentorDetails=await oldmentor.findOne({
        studentId:studentId})
    
    if(!oldMentorDetails){
     return res.status(404).send({message:"mentor not found"})
    }  
    res.status(200).send({message:"old mentor has succefully retrived",
    oldmentorName:oldMentorDetails. oldMentorName,
    studentName:oldMentorDetails.StudentName
})

}

})




module.exports=router
