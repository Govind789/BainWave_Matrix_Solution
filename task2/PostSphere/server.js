const mongoose = require('mongoose');

const app = require('./app');
const PORT = 3000;

const url = "mongodb+srv://$_USERNAME_$:$_PASSWORD_$@chatter.5igxjfn.mongodb.net/PhotoSphere?retryWrites=true&w=majority&appName=chatter";

let dbLink = url.replace("$_USERNAME_$",process.env.DB_USER);
dbLink = dbLink.replace("$_PASSWORD_$",process.env.DB_PASSWORD);
dbLink = dbLink.replace("$_DB_NAME_$",process.env.DB_NAME);

mongoose.connect(dbLink)
        .then(()=>console.log("Database Connected"))
        .catch(()=>console.log("Database not Connected"))


app.listen(PORT,()=>console.log(`Connected to server at port ${PORT}`))

