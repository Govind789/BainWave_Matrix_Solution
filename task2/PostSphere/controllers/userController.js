const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const generateToken = (userID)=>{
    const secret = process.env.SECRET;
    const token = jwt.sign({userID},secret,{expiresIn : '10d'});
    return token;
}

const login = async(req,res)=>{
    const {username,password} = req.body;
    

    try{
        if(!username || !password){
            return res.status(400).send({
                status : 'failed',
                msg : 'Enter username or password'
            })
        }

        const user = await userModel.findOne({username});

        if(!user){
            return res.status(400).json({
                status : 'failed',
                msg : 'User Doesnot exist please signup'
            })
        }else{

            const isPasswordCorrect = await bcrypt.compare(password,user.password);
    
            if(!isPasswordCorrect){
                return res.status(400).json({
                    status : 'failed',
                    msg : 'Incorrect email or password'
                })
            }else{
                res.status(200).json({
                    status : 'success',
                    data : {
                        user : {
                            id : user._id,
                            username : user.username
                        },
                        token : generateToken(user._id)
                    },
                });
            }
        }


    }catch(err){
        res.status(500).send({
            status : 'failed',
            msg : err
        })
    }
    
}

const signup = async (req, res) => {
    const { username, password } = req.body; 

    try {
        if (!username || !password) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Enter username and password'
            });
        }

        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                status: 'failed',
                msg: 'User already exists'
            });

        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const user = await userModel.create({ username, password: hashedPassword });
        
            res.status(201).json({
                status: 'success',
                msg: 'User created successfully',
                data: {
                    user: user,
                    token: generateToken(user._id),
                } 
            });
        }

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            msg: err
        });   
    }
}


module.exports = {
    login,
    signup
}