const debug = require('debug')('systemic-aws-s3');
const { S3, S3Client } = require("@aws-sdk/client-s3");

const commands = require('require-all')(__dirname + '/commands');

let client = null;
let aggregatedS3 = null;

module.exports = () => {
  const start = async ({ config }) => {
    debug('Initializing S3Client');
    aggregatedS3 = new S3(config);
    client = new S3Client(config);

    return {
      client,
      commandExecutor: commands['commandExecutor'](aggregatedS3),
      listObjects: commands['listObjects'](client),
      uploadObject :commands['uploadObject'](client)
    };
  };

  return {
    start,
  };
};
