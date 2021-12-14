require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("./generateToken.js");

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password -__v");

  if (!user) return res.status(200).send({ error: "User not found" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(200).send({ error: "Invalid Password" });

  const token = generateToken({ id: user.id });

  const friends = await User.find({'email': { $in: user.friends}}).select("-_id -__v -createdAt")

  const verifiedFriends = friends.filter(e => {if(e.friends.includes(user.email))return e})

  user.friendsData = verifiedFriends;

  user.password = undefined;

  res.send({ user, token });
};

module.exports = { signInUser };
