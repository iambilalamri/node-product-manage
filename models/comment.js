const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema({
  libelle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  value: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    libelle: Joi.string().min(5).max(50),
    value: Joi.string().min(1).max(20),
    description: Joi.string().min(10).max(255),
  });

  return schema.validate(comment);
}

exports.Comment = Comment;
exports.commentSchema = commentSchema;
exports.validate = validateComment;
