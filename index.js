const debug = require('debug')('systemic-aws-s3');
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const commands = require('require-all')(__dirname + '/commands');

let client = null;

module.exports = () => {
  const start = async ({
     config: {
        region,
        endpoint,
        credentials: {
            secretAccessKey,
            accessKeyId,
        },
     },
   }) => {
    debug('Initializing S3Client');
    client = new S3Client({
        region,
        endpoint,
        credentials: {
            secretAccessKey,
            accessKeyId,
        },
    });

    return {
      client,
      listObjects: commands['listObjects'](client),
    };
  };

  return {
    start,
  };
};
