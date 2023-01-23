import express from 'express';
import mongoose from 'mongoose';
import todoRouter from './routes/Todo-router';
import authRouter from './routes/Auth-router';

const PORT = 3000;
const URL = 'mongodb+srv://<MONGO__USERNAME>:<MONGO__PASS>@cluster0.2mywqf0.mongodb.net/<MONGO__COLLECTION>?retryWrites=true&w=majority';

const router = express();
router.use(express.json());
router.use(todoRouter);
router.use('/auth', authRouter);

mongoose.set('strictQuery', false);
mongoose
    .connect(URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((err) => console.log(err));

router.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});
