const express = require("express");
const auth = require("./../middlewares/auth");
const validateObjectId = require("./../middlewares/validateObjectId");
const {
  getComment,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const router = express.Router();

router.get("/", auth, getComments);
router.get("/:id", validateObjectId, getComment);
/**
 * @swagger
 * tags:
 *  name: "Comments"
 *  description: "Everyting about comments"
 * paths:
 *  /api/comments:
 *    post:
 *      tags:
 *      -   "Comments"
 *      summary: create comment
 *      description: create new comment in database
 *      requestBody:
 *        consumes:
 *        - application/json
 *        - application/xml
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                labelle:
 *                  type: string
 *                  description: labelle of comment
 *                description:
 *                  type: string
 *                  description: description of comment
 *                value:
 *                  type: string
 *                  description: value of comment
 *      responses:
 *        201:
 *          description: comment created successfully
 *        422:
 *          description: comment already exists
 */
router.post("/", auth, createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
