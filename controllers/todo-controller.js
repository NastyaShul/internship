const mongoose = require("mongoose");
const ToDo = require("../models/todo");

const getTodos = async (req, res) => {
    const {sort, page, limit, title, isDone} = req.query;
    const skip = (page - 1) * limit;

    let dbRequest = {};

    if(title){
        dbRequest = {title: req.query.title};
    } else if (isDone) {
        dbRequest = {isDone: req.query.isDone};
    } else if (title && isDone){
        dbRequest = {$and: [{title: req.query.title}, {isDone: req.query.isDone}]};
    }

    try{
        
        const user = mongoose.Types.ObjectId(req.user);
        const responseData = await ToDo.find({...dbRequest, user}).populate("user", "username")
        .sort({title: sort})
        .skip(skip).limit(limit);
        res.status(200).json(responseData);
    } catch(err){
        console.log(err)
        res.status(500).json({err});
    }
};

const getAllTodos = async (req, res) => {
    const {sort, page, limit, title, isDone} = req.query;
    const skip = (page - 1) * limit;

    let dbRequest = {};

    if(title){
        dbRequest = {title: req.query.title};
    } else if (isDone) {
        dbRequest = {isDone: req.query.isDone};
    } else if (title && isDone){
        dbRequest = {$and: [{title: req.query.title}, {isDone: req.query.isDone}]};
    }

    try{
        const responseData = await ToDo.find(dbRequest).populate("user", "username")
        .sort({title: sort})
        .skip(skip).limit(limit);
        res.status(200).json(responseData);
    } catch(err){
        console.log(err)
        res.status(500).json({err});
    }
};


const postTodo = async (req, res) => {
    try{
        const user = mongoose.Types.ObjectId(req.user.id);
        const newToDo = new ToDo({...req.body, user});
        newToDo.save();
        res.status(200).json(newToDo);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

const putTodo = async (req, res) => {
    try{
        const currentItem = await ToDo.findById(req.params.id);
        const user = mongoose.Types.ObjectId(req.user.id);
        if(currentItem.user.toString() == user.toString()){
            await ToDo.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({message: "Task changed"});
        } else {
            res.json({message: "You can't change this task"})
        }
    }
    catch(err){
        res.status(500).json({err});
    }
}

const deleteTodo = async (req, res) => {
    try{
        const currentItem = await ToDo.findById(req.params.id);
        const user = await mongoose.Types.ObjectId(req.user.id);
        if(currentItem.user.toString() == user.toString()){
            await ToDo.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Task deleted"});
        } else {
            res.json({message: "You can't delete this task"})
        }
    }
    catch(err){
        res.status(500).json({err});
    }
}

module.exports = {
    getAllTodos,
    getTodos,
    postTodo,
    putTodo,
    deleteTodo,
};