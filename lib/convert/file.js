const { ReadError } = require('../error');
const convertJson = require('./json');
const fs = require('fs');

async function convertFile(path, options = {}) {
  let text;
  try {
    text = fs.readFileSync(path, { encoding: 'utf8' });
  } catch (e) {
    throw new ReadError(e, `Could not read input file: ${path}`);
  }
  if (options.globals) {
    try {
      options.globals = fs.readFileSync(options.globals, { encoding: 'utf8' });
    } catch (e) {
      throw new ReadError(e, `Could not read globals file: ${options.globals}`);
    }
  }
  if (options.environment) {
    try {
      options.environment = fs.readFileSync(options.environment, {
        encoding: 'utf8',
      });
    } catch (e) {
      throw new ReadError(
        e,
        `Could not read environment file: ${options.environment}`
      );
    }
  }
  return convertJson(text, options);
}

module.exports = convertFile;
