const debug = require('debug')('systemic-aws-s3');
const customClient = require('require-all')(__dirname + '/custom');

module.exports = (s3Client) => async ({ commandParams, commandName }) => {
  try {
    debug(`Calling ${commandName}`);
    const client = customClient[commandName] ? customClient : s3Client
    const data = await client[commandName](commandParams);
    debug(`${commandName} executed successfully`);
    return data;
  } catch (error) {
    console.log(error.message)
    debug(`Error executing ${commandName}: ${error.message}`);
    throw error;
  }
};
