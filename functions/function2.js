const db = require("./db");

// Mock Function
module.exports.applyDiscount = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  if (customer.points > 10) order.totalPrice *= 0.9;
};
