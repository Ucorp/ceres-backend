const fs = require("fs");
const path = require("path");

const createEnv = require("../../../scripts/create-env/create-env");

describe("init env", () => {
  const exampleFile = path.resolve(__dirname, "../../fixtures/", ".env.example");
  const tempFile = path.resolve(__dirname, "../../fixtures/", ".env.temp");

  beforeEach(() => {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  });

  test("should return an error when called with the wrong baseFile", () => {
    expect(() => createEnv("wrong-file-path")).toThrow();
  });

  test("should create a file", () => {
    createEnv(exampleFile, ["temp"]);
    expect(fs.existsSync(tempFile)).toBe(true);
  });
});
