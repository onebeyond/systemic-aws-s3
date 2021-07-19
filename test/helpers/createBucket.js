const commandConfig = (bucketName) => ({
  commandParams: {
    Bucket: bucketName
  },
  commandName:'createBucket'
})
const createBucket = (s3, bucketName) => s3.commandExecutor(commandConfig(bucketName))

module.exports = {
  createBucket
}
