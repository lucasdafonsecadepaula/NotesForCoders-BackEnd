const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { registerUser } = require("../controllers/registerUser.js");
const { signInUser } = require("../controllers/signInUser.js");
const { forgotPassword } = require("../controllers/forgotPassword.js");
const { verifyToken } = require("../controllers/verifyToken.js");
const { createNote } = require("../controllers/createNote");

const router = express.Router();

router.post("/access-acount", signInUser);
router.post("/create-acount", registerUser);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password-verify-token", verifyToken);




router.use(authMiddleware);
router.get("/verifytoken", (req, res) => {
  res.send({ ok: true, user: req.userId });
});
router.post("/create-note", createNote);

module.exports = router;
