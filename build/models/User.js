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
const mongoose_2 = require("mongoose");
const Todo_1 = __importDefault(require("./Todo"));
const UserSchema = new mongoose_2.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    roles: [{ type: String, ref: 'Role' }]
}, {
    versionKey: false
});
UserSchema.pre("deleteOne", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id } = this.getQuery();
        // @ts-ignore
        this._userId = _id;
    });
});
UserSchema.post('deleteOne', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const res = yield Todo_1.default.deleteMany({ user: this._userId });
        console.log(res);
    });
});
exports.default = mongoose_1.default.model('User', UserSchema);
