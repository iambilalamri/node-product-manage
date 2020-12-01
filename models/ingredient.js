const mongoose = require("mongoose");
const Joi = require("joi");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:5,
    maxlength:50,
    trim: true
  },
  quantity: {
    type: String,
    required: true,
    minlength:1,
    maxlength:6
  },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

function validateIngredient(ingredient) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    quantity: Joi.string().min(1).max(6).required(),
  });

  return schema.validate(ingredient);
}

exports.Ingredient = Ingredient;
exports.ingredientSchema = ingredientSchema;
exports.validate = validateIngredient;
