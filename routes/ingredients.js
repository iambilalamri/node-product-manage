const express = require("express");
const {
  getIngredient,
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredients");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getIngredients);
router.get("/:id", getIngredient);
router.post("/", auth, createIngredient);
router.post("/:id", auth, updateIngredient);
router.post("/:id", auth, deleteIngredient);

module.exports = router;
