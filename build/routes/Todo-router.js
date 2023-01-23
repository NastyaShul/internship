"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Todo_controller_1 = __importDefault(require("../controllers/Todo-controller"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const validMiddleware_1 = require("../middleware/validMiddleware");
const router = express_1.default.Router();
router.get('/list', authMiddleware_1.authMiddleware, Todo_controller_1.default.getTodo);
router.post('/list', authMiddleware_1.authMiddleware, (0, validMiddleware_1.validationTodoRules)(), validMiddleware_1.validate, Todo_controller_1.default.createTodo);
router.put('/list/:id', authMiddleware_1.authMiddleware, Todo_controller_1.default.updateTodo);
router.delete('/list/:id', authMiddleware_1.authMiddleware, Todo_controller_1.default.deleteTodo);
exports.default = router;
