import express from 'express';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { validationAuthRules, validate } from '../middleware/validMiddleware';

import controller from '../controllers/Auth-controller';

const router = express.Router();

router.post('/registration', validationAuthRules(), validate, controller.registration);
router.post('/login', controller.login);
router.get('/users', adminMiddleware(["admin"]), controller.getUsers);
router.delete('/users/:id', adminMiddleware(["admin"]), controller.deleteUser);

export default router;
