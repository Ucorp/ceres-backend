const fs = require("fs");
const createEnv = require("./init-env");

describe("init env", () => {
  const exampleFile = `${__dirname}/temp/.env.example`;
  const tempFile = `${__dirname}/temp/.env.temp`;

  beforeEach(() => {
    if (!fs.existsSync(tempFile)) {
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
