describe("JEST MOCK FUNCTION", () => {

  it("should return mocked object", () => {
    const mockFunction = jest.fn();
    mockFunction.mockReturnValue({
      name: "Bilal",
      age: 18,
      isAutorized: false,
    });
    const res = mockFunction();
    expect(res.name).toEqual("Bilal");
    expect(res.age).toBeGreaterThanOrEqual(18);
    expect(res.isAutorized).toBeFalsy();
  });

});

