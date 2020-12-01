const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  addComment,
  addIngredient,
  getProduct,
  deleteProduct,
} = require("./../controllers/products.js");
const auth = require("./../middlewares/auth.js");
const { admin } = require("./../middlewares/admin.js");

router.get("/", getProducts);
router.get("/:id", getProduct);

/**
 * @swagger
 * tags:
 *  name: "Products"
 *  description: "Endpoints about managing products"
 * paths:
 *  /api/products:
 *    post:
 *      tags:
 *      -   "Products"
 *      summary: create product
 *      description: create new product in database
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: name of product
 *                price:
 *                  type: number
 *                  description: price of product
 *                weight:
 *                  type: number
 *                  description: weight of product
 *                quantity:
 *                  type: number
 *                  description: quantity of a single product
 *                expireDate:
 *                  type: string
 *                  format: "date-time"
 *                  description: expire date of each product
 *                selectedImage:
 *                  type: string
 *                  description: image of product
 *                isGuaranteed:
 *                  type: boolean
 *                  description: option of guarantee of product
 *                guaranteeDuree:
 *                  type: number
 *                  description: guarantee's duree of product
 *      responses:
 *        201:
 *          description: product created successfully
 *        422:
 *          description: product already exists
 */
router.post("/", auth, createProduct);
router.post("/:id/comments", addComment);
router.post("/:id/ingredients", addIngredient);
// router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
