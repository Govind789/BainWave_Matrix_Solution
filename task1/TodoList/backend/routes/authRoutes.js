const express = require('express');
const authRouter = express.Router();

const {login, signUp} = require('../controllers/authController');

authRouter.route('/login')
            .post(login);


authRouter.route('/signup')
            .post(signUp);

module.exports = authRouter;