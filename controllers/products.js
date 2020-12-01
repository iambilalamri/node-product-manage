const { Product, validate } = require("./../models/product.js");
const { Comment, validateComment } = require("./../models/comment.js");
const {
  Ingredient,
  validate: validateIngredient,
} = require("./../models/ingredient.js");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let product = new Product({
      name: req.body.name,
      price: req.body.price,
      weight: req.body.weight,
      incredients: req.body.incredients,
      quantity: req.body.quantity,
      expireDate: req.body.expireDate,
      selectedImage: req.body.selectedImage,
      isGuaranteed: req.body.isGuaranteed,
      guaranteeDuree: req.body.guaranteeDuree,
    });
    await product.save();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const product = await Product.findById(req.params.id);
    const newComment = new Comment({
      libelle: req.body.libelle,
      description: req.body.description,
      value: req.body.value,
    });
    product.comments.push(newComment);
    await product.save();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

const addIngredient = async (req, res) => {
  try {
    const { error } = validateIngredient(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send(`The product ${req.params.id} is not found!`);
    }
    const newIngredient = new Ingredient({
      name: req.body.name,
      quantity: req.body.quantity,
    });
    product.ingredients.push(newIngredient);
    await product.save();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found.");

    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
      return res.status(404).send(`The product ${req.params.id} is not found!`);
    }
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addComment,
  addIngredient,
};
