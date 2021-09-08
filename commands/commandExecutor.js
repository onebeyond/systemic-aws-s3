const debug = require('debug')('systemic-aws-s3');
const customClient = require('require-all')(__dirname + '/commands/custom');

module.exports = (s3Client) => async ({ commandParams, commandName }) => {
  try {
    debug(`Calling ${commandName}`);
    const command = customClient[commandName] || s3Client[commandName];
    if (!command) throw Error(`Command ${commandName} not found!`);
    const data = await command(commandParams);
    debug(`${commandName} executed successfully`);
    return data;
  } catch (error) {
    debug(`Error executing ${commandName}: ${error.message}`);
    throw error;
  }
};
