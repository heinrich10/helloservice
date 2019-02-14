
const { readFile } = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../../sec/pub_key.pem');

module.exports = () => readFile(filePath);
