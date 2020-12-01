const express = require("express");
const {
  getProvider,
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
} = require("./../controllers/providers.js");

const router = express.Router();

router.get("/", getProviders);
router.get("/:id", getProvider);
router.post("/", createProvider);
router.post("/:id", updateProvider);
router.post("/:id", deleteProvider);

module.exports = router;
