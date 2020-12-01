const { Comment, validate } = require("./../models/comment.js");
const mongoose = require("mongoose");

module.exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.send(comments);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getComment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send("invalid ID");
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).send("The comment with id is not found");
    res.send(comment);
  } catch (error) {
    res.status(500).send("Something went wrong");
    console.log(error);
  }
};

module.exports.createComment = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let comment = new Comment({
      libelle: req.body.libelle,
      description: req.body.description,
      value: req.body.value,
    });
    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports.updateComment = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!comment)
      return res
        .status(404)
        .send("The comment with the given ID was not found.");

    res.send(comment);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment) {
      return res.status(404).send(`The comment ${req.params.id} is not found!`);
    }
    res.send(comment);
  } catch (error) {
    console.log(error);
  }
};
