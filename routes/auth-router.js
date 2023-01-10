const express = require("express");
const { registration, login, getUsers } = require("../controllers/auth-controller");
const {check} = require("express-validator");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/registration", [
    check("username", "The field cannot be empty").notEmpty(),
    check("password", "The password should have 4+ symbols").isLength({min:4, max:10})
],registration);
router.post("/login", login);
router.get("/users",adminMiddleware(["admin"]), getUsers);

module.exports = router;