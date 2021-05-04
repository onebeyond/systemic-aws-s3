const {CreateBucketCommand} = require("@aws-sdk/client-s3");
const createBucket = (s3, bucketName) => s3.client.send(new CreateBucketCommand({
  Bucket: bucketName,
}));


module.exports = {
  createBucket
}
