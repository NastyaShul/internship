import express from 'express';
import controller from '../controllers/Todo-controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { validationTodoRules, validate } from '../middleware/validMiddleware';

const router = express.Router();

router.get('/list', authMiddleware, controller.getTodo);
router.post('/list', authMiddleware, validationTodoRules(), validate, controller.createTodo);
router.put('/list/:id', authMiddleware, controller.updateTodo);
router.delete('/list/:id', authMiddleware, controller.deleteTodo);

export default router;
