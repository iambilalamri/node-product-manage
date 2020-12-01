const express = require("express");
const auth = require("./../middlewares/auth");
const validateObjectId = require("./../middlewares/validateObjectId");
const {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roles");

const router = express.Router();

router.get("/", auth, getRoles);
router.get("/:id", validateObjectId, getRole);
/**
 * @swagger
 * tags:
 *  name: "Roles"
 *  description: "Everyting about roles"
 * paths:
 *  /api/roles:
 *    post:
 *      tags:
 *      -   "Roles"
 *      summary: create role
 *      description: create new role in database
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
 *                  description: name of role
 *      responses:
 *        201:
 *          description: role created successfully
 *        422:
 *          description: role already exists
 */
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
