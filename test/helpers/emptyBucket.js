const listObjectsConfig = (bucketName) => ({
  commandParams: { Bucket: bucketName },
  commandName: 'listObjectsV2'
})

const deleteObjectConfig = (bucketName, object) => ({
  commandParams: {
    Bucket: bucketName,
    Key: object.Key,
  },
  commandName: 'deleteObject'
})

const emptyBucket = async (s3, bucketName) => {
  const res = await s3.commandExecutor(listObjectsConfig(bucketName));

  if (res.Contents) {
    await Promise.all(
      res.Contents.map((object) => s3.commandExecutor(deleteObjectConfig(bucketName, object)))
    );
  }
}

module.exports = {
  emptyBucket
}
