"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const RoleSchema = new mongoose_2.Schema({
    value: { type: String }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('Role', RoleSchema);
