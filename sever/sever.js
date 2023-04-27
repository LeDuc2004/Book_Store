import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors()) ;
app.get("/" , (req , res)=>{
    res.json({suc:"cc"})
})
app.post("/refreshTokne" , (req , res)=>{
    
})
app.post("/login" , (req , res)=>{
   const accessToken =  jwt.sign(req.body, "levanduc", { expiresIn: '30' });
   res.status(200).send({accessToken});
   const refreshTokne = jwt.sign(req.body, "levanduc");
})
app.listen(5000 , ()=>{
    console.log("http://localhost:5000");
})