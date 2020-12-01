const mongoose = require("mongoose");
const Joi = require("joi");
const { commentSchema } = require("./comment");
const { ingredientSchema } = require("./ingredient");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  ingredients: [
    {
      type: ingredientSchema,
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  comments: [
    {
      type: commentSchema,
      required: true,
    },
  ],
  selectedImage: {
    type: String,
    required: true,
  },
  isGuaranteed: {
    type: Boolean,
    required: true,
  },
  guaranteeDuree: {
    type: Number,
    default: 2,
  },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
    price: Joi.number(),
    weight: Joi.number(),
    ingredients: Joi.array(),
    quantity: Joi.number(),
    expireDate: Joi.date(),
    comments: Joi.array(),
    selectedImage: Joi.string(),
    isGuaranteed: Joi.boolean(),
    guaranteeDuree: Joi.number(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.productSchema = productSchema;
exports.validate = validateProduct;
