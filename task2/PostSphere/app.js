const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const userRouter = require('./routers/userRouter');
const app = express();
require('dotenv').config();

app.use(cors({origin:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRouter);

app.use((req,res,next)=> {
    let token;

    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer ")
    ){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        res.status(401).json({
            status : 'failed',
            msg : 'Login Required'
        });
    }

    try{
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if (err) {
                console.log("Token Verification Failed", err.message);
                return res.status(401).json({
                    status: 'failed',
                    msg: 'Invalid token',
                });
            } else {
                console.log("Decoded token", decoded);
                req.user = decoded;
                next();
            }
        });
    }catch(err){
        res.status(401).json({
            status: 'failed',
            msg : "Token Verification failed"
        })
    }
});


module.exports = app;