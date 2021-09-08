const debug = require('debug')('systemic-aws-s3');
const { S3, S3Client } = require("@aws-sdk/client-s3");

const commandExecutor = require('./commands/commandExecutor');

let client = null;
let aggregatedS3 = null;

module.exports = () => {
  const start = async ({ config }) => {
    debug('Initializing S3Client');
    aggregatedS3 = new S3(config);
    client = new S3Client(config);

    return {
      client,
      commandExecutor: commandExecutor(aggregatedS3)
    };
  };

  return {
    start,
  };
};
