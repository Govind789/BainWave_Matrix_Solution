const listModel = require("../models/listModel");
const userModel = require("../models/userModel");

const list = async(req,res)=>{

    const {title,body,user} = req.body;

    if(!title || !body || !user){
        res.status(400).json({
            status : 'failed',
            msg : 'title or body or email cannot be empty'
        });
    }
    const existingUser = await userModel.findOne({email: user});

    if(existingUser){
        
        const list = await listModel.create({title,body,user : existingUser})
        
        res.status(200).json({list});

        existingUser.lists.push(list);
        existingUser.save();

    }else{
            res.status(400).json({
                status : 'failed',
                msg : `user ${user} doesn't exist`
            })
    }
}

const updatList = async(req,res)=>{
    const {title,body,user} = req.body;

    if(!title || !body || !user){
        res.status(400).json({
            status : 'failed',
            msg : 'title or body or email cannot be empty'
        });
    }

    const existingUser = await userModel.findOne({email: user});

    if(existingUser){
        await listModel.findByIdAndUpdate(req.params.id,{
            title : title,
            body : body
        }).then(()=> res.status(200).json({
            status : 'success',
            msg : 'task updated'
        }))

    }else{
            res.status(400).json({
                status : 'failed',
                msg : `user ${email} doesn't exist`
            })
    }
}

const deleteTask = async(req,res)=>{

    const {email} = req.body;

    const existingUser = await userModel.findOneAndUpdate({email}, 
        {$pull : {lists : req.params.id}}
    );

    if(existingUser){
        await listModel.findByIdAndDelete(req.params.id)
        .then(()=> res.status(200).json({
            status : 'success',
            msg : 'task deleted successfully'
        }))
    }else{
        res.status(400).json({
            status : 'failed',
            msg : `user ${user} doesn't exist`
        })
    }
}


const getTasks = async(req,res)=>{

    const {email} = req.body;

    const list = await listModel.find({user : req.params.id}).sort({createdAt : -1})
    if(list.length != 0){
        res.status(200).json({
            list
        })
    }else{
        res.status(200).json({
            msg : 'No Tasks'
        })
    }
}



module.exports = {
    list,
    updatList,
    deleteTask,
    getTasks
}