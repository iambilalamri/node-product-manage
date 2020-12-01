const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();

const { User } = require("../models/user");

module.exports.signIn = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.cookie("authcookie", token, {
      expires: new Date(Date.now() + 50000),
      secure: false, // set to true if your using https
      httpOnly: true,
    });
    console.log(req.cookies["authcookie"]);
    res.send(token);
  } catch (error) {
    console.log(error);
  }
};

module.exports.signOut = (req, res) => {
  console.log(res);
  res.clearCookie("authcookie");
  res.send({ message: "Desconnected" });
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(req);
}
