const commandConfig = (bucketName) => ({
  commandParams: {
    Bucket: bucketName
  },
  commandName:'deleteBucket'
})

const deleteBucket = (s3, bucketName) => s3.commandExecutor(commandConfig(bucketName))

module.exports = {
  deleteBucket
}
