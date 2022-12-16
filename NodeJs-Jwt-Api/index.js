const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const secretKey = "secretKey";

const app = express()

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
      "Authorization"
    ],
  };
  
app.use(cors(corsOpts));

app.get("/",(req,responce)=>{
    responce.json({
        message:"get"
    })
})


//login api

app.post('/login',(req,responce)=>{
    const user = {
        id:1,
        username:'jaffar',
        email:'jaff@a.com'
    }
    jwt.sign({user},secretKey,{expiresIn:'500s'},(err,token)=>{
        responce.json({
            token
        })
    })
})

app.post('/profile',verifyToken,(req,responce)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            responce.send({
                result:"not valid token"
            })
        }else{
            responce.json({
                message:'done',
                authData
            })
        }
    })
})

function verifyToken(req,responce,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    }else{
        responce.send({
            result:'Token is not valid'
        })
    }
}

app.listen(5000,()=>{
    console.log("server is running")
})