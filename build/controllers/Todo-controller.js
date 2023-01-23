"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Todo_1 = __importDefault(require("../models/Todo"));
function isOfTypeTabs(keyInput) {
    return ["-1", "1"].includes(keyInput);
}
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { sort, page = 1, limit = 10, title, isDone } = req.query;
    const skip = (+page - 1) * +limit;
    let sortRequest = {};
    let dbRequest = {};
    if (isOfTypeTabs(sort)) {
        sortRequest = { title: sort };
    }
    if (title) {
        dbRequest = { title: req.query.title };
    }
    else if (isDone) {
        dbRequest = { isDone: req.query.isDone };
    }
    else if (title && isDone) {
        dbRequest = { $and: [{ title: req.query.title }, { isDone: req.query.isDone }] };
    }
    try {
        const user = new mongoose_1.default.Types.ObjectId(req.user.id);
        const responseData = yield Todo_1.default.find(Object.assign(Object.assign({}, dbRequest), { user }))
            .populate("user", "username")
            .sort(sortRequest)
            .skip(skip).limit(+limit);
        res.status(200).json(responseData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new mongoose_1.default.Types.ObjectId(req.user.id);
        const todo = new Todo_1.default(Object.assign(Object.assign({}, req.body), { user }));
        todo.save();
        res.status(201).json({ todo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentItem = yield Todo_1.default.findById(req.params.id);
        const user = new mongoose_1.default.Types.ObjectId(req.user.id);
        if (currentItem !== null) {
            if (currentItem.user.toString() == user.toString()) {
                yield Todo_1.default.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json({ message: 'Task changed' });
            }
            else {
                res.json({ message: "You can't delete this task" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentItem = yield Todo_1.default.findById(req.params.id);
        const user = new mongoose_1.default.Types.ObjectId(req.user.id);
        if (currentItem !== null) {
            if (currentItem.user.toString() == user.toString()) {
                yield Todo_1.default.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: "Task deleted" });
            }
            else {
                res.json({ message: "You can't delete this task" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.default = {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
};
