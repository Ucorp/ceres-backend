const fs = require("fs");
const path = require("path");
const randomstring = require("randomstring");

/**
 * Create .env files
 *
 * @param {string} baseFile path to base env file
 * @param {string[]} envs an array of environments names
 * @returns {void}
 */
const createEnv = (baseFile = ".env.example", envs = []) => {
  if (!fs.existsSync(baseFile)) {
    throw new Error(`File ${baseFile} not found.`);
  }

  envs.forEach(env => {
    if (!fs.existsSync(`.env.${env}`)) {
      try {
        const data = fs.readFileSync(path.resolve(baseFile));

        const result = data.toString().replace(/APP_KEY=/g, `APP_KEY=${randomstring.generate(32)}`);

        try {
          fs.writeFileSync(path.resolve(path.dirname(baseFile), `.env.${env}`), result);
        } catch (e) {
          throw new Error(`Can't create file .env.${env}`);
        }
      } catch (error) {
        throw new Error(`Can't read file ${baseFile}`);
      }
    }
  });
};

module.exports = createEnv;
