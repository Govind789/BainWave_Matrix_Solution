const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const listRouter = require('./routes/listRoutes');

app.use(cors({origin : true}));
app.use(express.json());

app.use('/api/v1',authRouter);
app.use('/api/v2',listRouter);

app.use('/',(req,res)=>{
    res.status(200).json({
        status : 'success',
        msg : 'Server Started Successfully'
    });
})

module.exports = app;