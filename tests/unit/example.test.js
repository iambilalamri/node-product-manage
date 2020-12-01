// TEST = INTEGRATION + UNIT + END-TO-END

// UNIT TEST = tests a unit of an application without its EXTERNAL dependencies
// INGRATION TEST = tests a unit of an application with its EXTERNAL dependencies
// END-TO-END TEST = Drives an application through its UI (Selenium, Cypress)
test("one plus two is three", () => {
  expect(1 + 2).toEqual(3);
});

test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test("there is no I in team", () => {
  expect("team").not.toMatch(/K/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});
//***********************************************//
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "beer",
];

test("the shopping list has beer on it", () => {
  expect(shoppingList).toContain("beer");
  expect(new Set(shoppingList)).toContain("beer");
});

const carrencies = ["USD", "EUR", "AUD"];
test("should check if carrencies exists", () => {
  expect(carrencies).toEqual(expect.arrayContaining(["EUR", "AUD", "USD"]));
});

//***********************************************//
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK");
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});

//******************************************** */
function getProduct(productId) {
  return { id: productId, price: 10 };
}

describe("GetProducts", () => {
  it("should return product with a given id", () => {
    const result = getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});
