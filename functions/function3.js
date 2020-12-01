const db = require("./db");
const email = require("./email");

module.exports.notifyCustomer = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  email.send(customer.email, "Your order was placed successfully.");
};
