const express = require("express");
const { getUsers, checkUserAccess } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/list", authMiddleware, getUsers);
router.post("/check-access", authMiddleware, checkUserAccess);

module.exports = router;
