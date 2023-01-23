import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Todo from '../models/Todo';

function isOfTypeTabs(keyInput: any): keyInput is mongoose.SortOrder {
    return ["-1", "1"].includes(keyInput);
}

const getTodo = async (req: Request, res: Response) => {
    let { sort, page = 1, limit = 10, title, isDone } = req.query;
    const skip = (+page - 1) * +limit;

    let sortRequest = {};

    let dbRequest = {};

    if (isOfTypeTabs(sort)) {
        sortRequest = {title: sort}
    }

    if (title) {
        dbRequest = { title: req.query.title };
    } else if (isDone) {
        dbRequest = { isDone: req.query.isDone };
    } else if (title && isDone) {
        dbRequest = { $and: [{ title: req.query.title }, { isDone: req.query.isDone }] };
    }

    try {
        const user = new mongoose.Types.ObjectId(req.user.id);
        const responseData = await Todo.find({...dbRequest, user})
            .populate("user", "username")
            .sort(sortRequest)
            .skip(skip).limit(+limit)
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const createTodo = async (req: Request, res: Response) => {
    try {
        const user = new mongoose.Types.ObjectId(req.user.id);
        const todo = new Todo({...req.body, user});
        todo.save();
        res.status(201).json({ todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const updateTodo = async (req: Request, res: Response) => {
    try {
        const currentItem = await Todo.findById(req.params.id);
        const user = new mongoose.Types.ObjectId(req.user.id);
        if(currentItem !== null){
            if(currentItem.user.toString() == user.toString()){
                await Todo.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json({ message: 'Task changed' });
            } else {
                res.json({message: "You can't delete this task"})
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const currentItem = await Todo.findById(req.params.id);
        const user = new mongoose.Types.ObjectId(req.user.id);
        if(currentItem !== null){
            if(currentItem.user.toString() == user.toString()){
                await Todo.findByIdAndDelete(req.params.id);
                res.status(200).json({message: "Task deleted"});
            } else {
                res.json({message: "You can't delete this task"})
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

export default {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
};
