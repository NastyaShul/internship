const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const roleSchema = new Schema({
    value: {type: String, unique: true, default: "user"},
    __v: {type: Number, select: false }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;