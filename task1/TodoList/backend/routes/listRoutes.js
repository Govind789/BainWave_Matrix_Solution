const express = require('express');
const listRouter = express.Router();

const { list, updatList, deleteTask, getTasks } = require('../controllers/listController');


listRouter.route('/addTask')
            .post(list);

listRouter.route('/updateTask/:id')
            .put(updatList);

listRouter.route('/deleteTask/:id')
            .delete(deleteTask);

listRouter.route('/getTasks/:id')
            .get(getTasks);


module.exports = listRouter;