const normalizePort = value => {
  const port = parseInt(value, 10);

  if (!Number.isNaN(port) && port > 0) {
    return port;
  }
  return false;
};

module.exports = normalizePort;
