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

const deleteBucketConfig = (bucketName) => ({
  commandParams: {
    Bucket: bucketName
  },
  commandName:'deleteBucket'
})

const clearAndDelete = client => async ({ bucketName }) => {
  const res = await client.commandExecutor(listObjectsConfig(bucketName));

  if (res.Contents) {
    await Promise.all(
      res.Contents.map((object) => client.commandExecutor(deleteObjectConfig(bucketName, object)))
    );
  }

  return client.commandExecutor(deleteBucketConfig(bucketName))
};

module.exports = clearAndDelete;
