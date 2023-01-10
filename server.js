const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo-routes");
const authRouter = require("./routes/auth-router");

const PORT = 8000;
const URL = "mongodb+srv://Nasiia:Pass321@cluster0.2mywqf0.mongodb.net/auth_roles?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(todoRoutes);
app.use("/auth", authRouter);


mongoose.connect(URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((err) => console.log(err));

    app.listen(PORT, (err) => {
        err ? console.log(err) : console.log(`Listening port ${PORT}`);
    });



