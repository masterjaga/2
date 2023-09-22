const express=require("express");
const student=require("../models/student.model")
const router=express.Router();



router.get("/student",(req,res)=>{
  student.find({}).then((data)=>res.status(200).send({data:data}))
})


router.post("/create/Student",async(req,res)=>{
    try{
       let newStudent=new student(req.body);

     await   newStudent.save().then(data=>{
        res.status(201).send({message:"student successfuly created",data:data})
       }).catch((er)=> res.status(401).send({message:"error valid data"}))
    
    }catch(er){
        res.status(500).send({message:"internal server error"})
}   
})



//who has a mentor should not shown in list
router.get("/student/withoutMentor",async(req,res)=>{
  let notAssingedStudent=await student.find({isAssigned:false})

  res.status(200).send({message:"successfully retrived student who has no mentor", notAssingedStudent})
})
module.exports=router;
