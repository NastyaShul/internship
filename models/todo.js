const mongoose = require("mongoose");
const {body, validationResult} = require("express-validator");

const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const todoSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    title: { type: String},
    isDone: {type: Boolean},
    __v: {type: Number, select: false }
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;