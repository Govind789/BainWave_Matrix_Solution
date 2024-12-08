const express = require('express');
const app = require('./app');
const mongoose = require('mongoose');
const PORT = 5000;

const mongoURL = "mongodb+srv://gvgupta789:WltWp1vHRAvZQQi2@chatter.5igxjfn.mongodb.net/chatter?retryWrites=true&w=majority&appName=chatter";

mongoose.connect(mongoURL)
        .then(()=>console.log('Database Connected'))
        .catch(()=>console.log('Database not Connected'));

app.listen(PORT,()=>console.log(`Server Connected at PORT ${PORT}`));