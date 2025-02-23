const express = require("express");
const { signup, login } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-access/:userId/:module", checkAccess);


module.exports = router;
