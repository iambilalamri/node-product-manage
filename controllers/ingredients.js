const { Ingredient, validate } = require("./../models/ingredient");

module.exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.send(ingredients);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.send(ingredient);
  } catch (error) {
    res.status(500).send("Something went wrong");
    console.log(error);
  }
};

module.exports.createIngredient = async (req, res) => {
  try {
    const { error } = validate(req.body);
    console.log("Error logged", error);
    if (error) return res.status(400).send(error.details[0].message);
    let ingredient = new Ingredient({
      name: req.body.name,
      quantity: req.body.quantity,
    });
    await ingredient.save();
    res.send(ingredient);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports.updateIngredient = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        quantity: req.body.quantity,
      },
      {
        new: true,
      }
    );

    if (!ingredient)
      return res
        .status(404)
        .send("The ingredient with the given ID was not found.");

    res.send(ingredient);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndRemove(req.params.id);
    if (!ingredient) {
      return res
        .status(404)
        .send(`The ingredient ${req.params.id} is not found!`);
    }
    res.send(ingredient);
  } catch (error) {
    console.log(error);
  }
};
