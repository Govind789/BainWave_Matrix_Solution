const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(cors({origin:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',userRouter);
app.use('/api',blogRouter);

app.use((req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            status: 'failed',
            msg: 'Token must be provided'
        });
    }

    try {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log("Token Verification Failed", err.message);
                return res.status(401).json({
                    status: 'failed',
                    msg: 'Invalid token',
                });
            } else {
                req.user = decoded;
                return next();
            }
        });
    } catch (err) {
        return res.status(401).json({
            status: 'failed',
            msg: 'Token verification failed',
        });
    }
});



module.exports = app;