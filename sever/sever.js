import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors()) ;




app.post("/login" , (req , res)=>{
   if (req.headers.authorization == "levanduc") {
       const accessToken =  jwt.sign(req.body, "levanduc");
       
       res.status(200).send({accessToken});
   }else{
       res.status(404).send("ERROR");

   }

})
app.get("/user" , authenToken , (req , res)=>{
    const user = req.user;
    res.send({user})
})
function authenToken(req , res , next) {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    if(!token) res.send(401);
    jwt.verify(token, "levanduc", (err, data)=>{
        if (data) {
            req.user = data; 
            next();
        }
    })
    
}
app.post("/logout" , (req , res)=>{
    
})

app.listen(5000 , ()=>{
    console.log("http://localhost:5000");
})