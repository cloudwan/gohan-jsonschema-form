const genericNames = require('generic-names');

module.exports = function generateClassName(name, filename) {
  if (filename.includes('node_modules')) {
    return name;
  }

  return genericNames('[name]__[local]___[hash:base64:5]', {
    context: process.cwd(),
  })(name, filename);
};
