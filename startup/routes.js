const cors = require("cors");
const express = require("express");
// To bind swagger with express and show the ui provided by swagger js-doc
const swaggerUi = require("swagger-ui-express");
// For api documentation
const swaggerJSDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");

const products = require("./../routes/products");
const users = require("./../routes/users");
const ingredients = require("./../routes/ingredients");
const comments = require("./../routes/comments");
const providers = require("./../routes/providers");
const auth = require("./../routes/auth");
const roles = require("./../routes/roles");
const error = require("./../middlewares/errors");

function routes(app) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Products MANAGE API",
        version: "1.0.0",
      },
    },
    apis: [
      "./routes/products.js",
      "./routes/users.js",
      "./routes/providers.js",
      "./routes/ingredients.js",
      "./routes/comments.js",
      "./routes/auth.js",
      "./routes/roles.js",
    ],
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/api-documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/products", products);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/ingredients", ingredients);
  app.use("/api/comments", comments);
  app.use("/api/provider", providers);
  app.use("/api/roles", roles);
}

module.exports = { routes };
