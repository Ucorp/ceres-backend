const normalizePort = require("../../../src/shared/utils/normalize-port");

describe("normalize port", () => {
  test("should return port", () => {
    expect(normalizePort(80)).toBe(80);
    expect(normalizePort("123")).toBe(123);
    expect(normalizePort("123ssw")).toBe(123);
  });
  test("should return false", () => {
    expect(normalizePort(0)).toBe(false);
    expect(normalizePort("str")).toBe(false);
    expect(normalizePort("str123")).toBe(false);
    expect(normalizePort("")).toBe(false);
    expect(normalizePort("-1")).toBe(false);
    expect(normalizePort(-1)).toBe(false);
  });
});
