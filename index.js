require("dotenv").config();

const express =require("express")
const app=express();
const db=require("./db/connect");

const cors=require('cors');
const studentRouter=require("./routes/student.routes")
const mentorRouter=require("./routes/mentor.routes")


app.use(express.json())
app.use(cors());
app.use(mentorRouter)
app.use(studentRouter)

db();

const port=process.env.port||8000

app.listen(port,()=>{
    console.log("port is running",port)
})
