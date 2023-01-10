const express = require("express");
const {getTodos, getAllTodos, postTodo, putTodo, deleteTodo} = require("../controllers/todo-controller");
const {authMiddleware} = require("../middleware/authMiddleware");
const { validationRules, validate } = require('../middleware/validMiddleware')

const router = express.Router();

router.get("/list/admin", authMiddleware, getAllTodos);
router.get("/list", authMiddleware, getTodos);
router.post("/list",authMiddleware, validationRules(), validate, postTodo);
router.put("/list/:id",authMiddleware, putTodo);
router.delete("/list/:id",authMiddleware, deleteTodo);

module.exports = router;