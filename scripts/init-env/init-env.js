const fs = require("fs");
const path = require("path");

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
        fs.copyFileSync(
          path.resolve(baseFile),
          path.resolve(path.dirname(baseFile), `.env.${env}`)
        );
      } catch (e) {
        throw new Error(`Can't create file .env.${env}`);
      }
    }
  });
};

module.exports = createEnv;
