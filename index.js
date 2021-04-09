const debug = require('debug')('systemic-aws-s3');
const { S3Client } = require("@aws-sdk/client-s3");

const commands = require('require-all')(__dirname + '/commands');

let client = null;

module.exports = () => {
  const start = async ({ config }) => {
    debug('Initializing S3Client');
    client = new S3Client(config);

    return {
      client,
      listObjects: commands['listObjects'](client),
    };
  };

  return {
    start,
  };
};
