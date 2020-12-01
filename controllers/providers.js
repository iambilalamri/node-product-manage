const { Provider, validate } = require("./../models/provider.js");

const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.send(providers);
  } catch (error) {
    console.log(error);
  }
};

const getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    res.send(provider);
  } catch (error) {
    console.log(error);
  }
};

const createProvider = async (req, res) => {
  try {
    const { error } = validate(req.body);
    console.log("Error logged", error);
    if (error) return res.status(400).send(error.details[0].message);
    let provider = new Provider({
      name: req.body.name,
      siret: req.body.siret,
      dateEtablissement: req.body.dateEtablissement,
      founder: req.body.founder,
      location: req.body.location,
      products: req.body.products,
    });

    await provider.save();
    res.send(provider);
  } catch (error) {
    // LOG the Exception
    res.status(500).send("Something went wrong");
  }
};

const updateProvider = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const provider = await Product.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!provider)
      return res
        .status(404)
        .send("The provider with the given ID was not found.");

    res.send(provider);
  } catch (error) {
    console.log(error);
  }
};

const deleteProvider = async (req, res) => {
  try {
    const provider = await Product.findByIdAndRemove(req.params.id);
    if (!provider) {
      return res.status(404).send(`The product ${req.params.id} is not found!`);
    }
    res.send(provider);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProviders,
  getProvider,
  createProvider,
  updateProvider,
  deleteProvider,
};
