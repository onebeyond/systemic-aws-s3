const debug = require('debug')('systemic-aws-s3');
const { GetObjectCommand } = require("@aws-sdk/client-s3");

module.exports = client => async ({ bucketName, bucketObjectKey }) => {
  debug('Calling GetObjectCommand');
  const commandParams = {
    Bucket: bucketName,
    Key: bucketObjectKey
  };

  const command = new GetObjectCommand(commandParams);

  try {
    const data = await client.send(command);
    return data;
  } catch (error) {
    debug(`Error executing GetObjectCommand: ${error.message}`);
    throw error;
  }
};
