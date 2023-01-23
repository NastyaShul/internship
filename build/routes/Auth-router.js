"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const validMiddleware_1 = require("../middleware/validMiddleware");
const Auth_controller_1 = __importDefault(require("../controllers/Auth-controller"));
const router = express_1.default.Router();
router.post('/registration', (0, validMiddleware_1.validationAuthRules)(), validMiddleware_1.validate, Auth_controller_1.default.registration);
router.post('/login', Auth_controller_1.default.login);
router.get('/users', (0, adminMiddleware_1.adminMiddleware)(["admin"]), Auth_controller_1.default.getUsers);
router.delete('/users/:id', (0, adminMiddleware_1.adminMiddleware)(["admin"]), Auth_controller_1.default.deleteUser);
exports.default = router;
