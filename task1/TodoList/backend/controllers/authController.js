const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET);
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {

      res.status(400).json({
        status: 'failed',
        msg: 'username or password cannot be empty'
      })
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      res.status(400).json({
        status: 'failed',
        msg: "user does'nt exist please signup"
      })
    } else {

      const hashPassword = existingUser.password;
      const isMatch = await bcrypt.compare(password, hashPassword);

      if (isMatch) {
        res.status(200).json({
          status: 'success',
          data: {
            user: {
              id: existingUser?._id,
              email: existingUser?.email,
            },
            token: generateToken(existingUser?._id)
          }
        })
      } else {
        res.status(401).json({
          status: 'fail',
          message: "Email or password is incorrect",
        });
      }
    }

  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err?.message
    })
  }

}

const signUp = async (req, res) => {

  try{
    const { email, username, password } = req.body;
  
    if (!email || !username || !password) {
      res.status(400).json({
        status: 'failed',
        msg: 'username or password cannot be empty'
      })
    }
  
    const existingUser = await userModel.findOne({ email });
  
    if (existingUser) {
      res.status(400).json({
        status: 'failed',
        msg: "user already exist please login"
      })
    }else{
      const newPassword = await hashPassword(password);
      const user = await userModel.create({ email: email, password: newPassword, username: username });
    
      res.status(201).json({
        status: "success",
        data: {
          user: user,
          token: generateToken(user._id),
        }
      })
    }
  }catch(err){
    res.status(500).json({
      status: 'failed',
      message: err?.message
    })
  }

}

module.exports = {
  login,
  signUp
}