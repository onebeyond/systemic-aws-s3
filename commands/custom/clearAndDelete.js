const clearAndDelete = client => async ({ Bucket }) => {
  const res = await client['listObjectsV2']({ Bucket });

  if (res.Contents) {
    await Promise.all(
      res.Contents.map((object) => client['deleteObject']({
        Bucket,
        Key: object.Key,
      }))
    );
  }

  return client['deleteBucket']({ Bucket });
};

module.exports = clearAndDelete;
