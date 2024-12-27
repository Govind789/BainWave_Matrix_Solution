const express = require('express');
const userRouter = express.Router();

const {login , signup} = require('../controllers/userController');

userRouter.route('/login')
            .post(login);

userRouter.route('/signup')
            .post(signup);

module.exports = userRouter;