const {DeleteBucketCommand} = require("@aws-sdk/client-s3");
const deleteBucket = (s3, bucketName) => s3.client.send(new DeleteBucketCommand({
  Bucket: bucketName,
}));


module.exports = {
  deleteBucket
}
