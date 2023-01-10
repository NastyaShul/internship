const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    roles: [{type: String, ref: "Role"}],
    __v: {type: Number, select: false }
});

const User = mongoose.model("User", userSchema);

module.exports = User;