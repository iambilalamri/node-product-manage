const express = require("express");
const { createUser, getCurrentUser } = require("./../controllers/users.js");
const router = express.Router();
/**
 * @swagger
 * tags:
 *  name: "Users"
 *  description: "Everyting about users"
 * paths:
 *  /api/users:
 *    post:
 *      tags:
 *      -   "Users"
 *      summary: register user
 *      description: register new product in database
 *      requestBody:
 *        consumes:
 *        - application/json
 *        - application/xml
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                name:
 *                  type: string
 *                  description: name of user
 *                email:
 *                  type: string
 *                  description: email of user
 *                password:
 *                  type: string
 *                  description: password of product
 *      responses:
 *        201:
 *          description: user register successfully
 *        422:
 *          description: user already exists
 */
router.post("/", createUser);
router.get("/me", getCurrentUser);

module.exports = router;
