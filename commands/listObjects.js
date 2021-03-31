const debug = require('debug')('systemic-aws-s3');
const { ListObjectsV2Command } = require("@aws-sdk/client-s3");

module.exports = client => async ({ bucketName }) => {
  debug('Calling ListObjectsV2Command');
  const commandParams = {
    Bucket: bucketName,
  };

  const command = new ListObjectsV2Command(commandParams);

  try {
    const data = await client.send(command);
    return data;
  } catch (error) {
    debug(`Error executing ListObjectsV2Command: ${error.message}`);
    throw error;
  }
};
