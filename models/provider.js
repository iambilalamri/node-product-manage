const mongoose = require("mongoose");
const Joi = require("joi");

const { productSchema } = require("./product");

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  siret: {
    type: String,
    required: true,
  },
  dateEtablissement: {
    type: Date,
    default: Date.now(),
  },
  founder: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  products: [
    {
      type: productSchema,
      required: true,
    },
  ],
});

const Provider = mongoose.model("Provider", providerSchema);

function validateProvider(provider) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    siret: Joi.number().required(),
    dateEtablissement: Joi.date(),
    founder: Joi.string().required(),
    location: Joi.string().required(),
    products: Joi.array(),
  });

  return schema.validate(provider);
}

exports.Provider = Provider;
exports.providerSchema = providerSchema;
exports.validate = validateProvider;
