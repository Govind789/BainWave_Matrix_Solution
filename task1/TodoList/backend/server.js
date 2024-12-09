const express = require('express');
const app = require('./app');
const mongoose = require('mongoose');
const PORT = 5000;
require('dotenv').config();


mongoose.connect(process.env.mongoURL)
        .then(()=>console.log('Database Connected'))
        .catch(()=>console.log('Database not Connected'));

app.listen(PORT,()=>console.log(`Server Connected at PORT ${PORT}`));