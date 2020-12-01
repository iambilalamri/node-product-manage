const express = require("express");
const { signIn, signOut } = require("../controllers/auth.js");
const { admin } = require("./../middlewares/admin.js");

const router = express.Router();

router.post("/signIn", signIn);
router.get("/signOut", signOut);

module.exports = router;
