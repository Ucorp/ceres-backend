const getCurrentEnvironment = () => process.env.NODE_ENV || process.env.APP_ENV || "";

module.exports = getCurrentEnvironment;
