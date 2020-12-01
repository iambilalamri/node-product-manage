const { Role, validate } = require("./../models/role");
const mongoose = require("mongoose");

module.exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.send(roles);
  } catch (error) {
    res.status(500).send("Something went WRONG");
    console.log(error);
  }
};

module.exports.getRole = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send("invalid ID");
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).send("The role with id is not found");
    res.send(role);
  } catch (error) {
    res.status(500).send("Something went wrong");
    console.log(error);
  }
};

module.exports.createRole = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let role = new Role({
      name: req.body.name,
    });
    await role.save();
    res.send(role);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports.updateRole = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!role)
      return res.status(404).send("The role with the given ID was not found.");

    res.send(role);
  } catch (error) {
    res.status(500).send("Something went WRONG");
    console.log(error);
  }
};

module.exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndRemove(req.params.id);
    if (!role) {
      return res.status(404).send(`The role ${req.params.id} is not found!`);
    }
    res.send(role);
  } catch (error) {
    res.status(500).send("Something went WRONG");
    console.log(error);
  }
};
