"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Todo_router_1 = __importDefault(require("./routes/Todo-router"));
const Auth_router_1 = __importDefault(require("./routes/Auth-router"));
const PORT = 3000;
const URL = 'mongodb+srv://<MONGO__USERNAME>:<MONGO__PASS>@cluster0.2mywqf0.mongodb.net/<MONGO__COLLECTION>?retryWrites=true&w=majority';
const router = (0, express_1.default)();
router.use(express_1.default.json());
router.use(Todo_router_1.default);
router.use('/auth', Auth_router_1.default);
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((err) => console.log(err));
router.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});
