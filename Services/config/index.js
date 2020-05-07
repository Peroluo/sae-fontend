const { NODE_ENV } = process.env;

const fileName = NODE_ENV === 'production' ? 'production' : 'development';

module.exports = require(`./${fileName}.json`);