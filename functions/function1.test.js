const lib = require("./function1");

describe("FizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    expect(() => {
      lib.fizzBuzz("a");
    }).toThrow();
    expect(() => {
      lib.fizzBuzz(null);
    }).toThrow();
    expect(() => {
      lib.fizzBuzz(undefined);
    }).toThrow();
    expect(() => {
      lib.fizzBuzz({});
    }).toThrow();
  });

  it("should return FizzBuzz if input is not a number divisible by 3 and by 5", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toEqual("FizzBuzz");
  });

  it("should return Buzz if input is not a number divisible by 5 ", () => {
    const result = lib.fizzBuzz(5);
    expect(result).toEqual("Buzz");
  });

  it("should return Fizz if input is not a number divisible by 3", () => {
    const result = lib.fizzBuzz(3);
    expect(result).toEqual("Fizz");
  });
});
