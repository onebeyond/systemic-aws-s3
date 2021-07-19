const debug = require('debug')('systemic-aws-s3');

module.exports = client => async ({ commandParams, commandName }) => {

  try {
    debug(`Calling ${commandName}`);
    const data = await client[commandName](commandParams);
    debug(`${commandName} executed successfully`);
    return data;
  } catch (error) {
    debug(`Error executing ${commandName}: ${error.message}`);
    throw error;
  }
};
