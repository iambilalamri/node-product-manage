const mongoose = require("mongoose");
const Joi = require("joi");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
});

const Role = mongoose.model("Role", roleSchema);

function validateRole(role) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).trim().required(),
  });

  return schema.validate(role);
}

exports.Role = Role;
exports.roleSchema = roleSchema;
exports.validate = validateRole;
