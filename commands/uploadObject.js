const debug = require('debug')('systemic-aws-s3');
const {PutObjectCommand} = require("@aws-sdk/client-s3");

module.exports = client => async ({bucketName, bucketObjectKey, bucketObjectBody}) => {
  debug('Calling PutObjectCommand');
  const commandParams = {
    Bucket: bucketName,
    Key: bucketObjectKey,
    Body: bucketObjectBody,
  }

  const command = new PutObjectCommand(commandParams);

  try {
    const data = await client.send(command);
    debug(`Object ${bucketObjectKey} uploaded`);
    return data;
  } catch (error) {
    debug(`Error executing PutObjectCommand: ${error.message}`);
    throw error;
  }
};
