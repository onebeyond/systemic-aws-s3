const {createBucket} = require('../helpers/createBucket')
const {emptyBucket} = require('../helpers/emptyBucket')
const {startS3Component} = require('../helpers/startS3Component')
const localstackConfig = require('../fixtures/localstackConfig')
const {streamToString} = require("../helpers/streamToString");

const bucketName = 'test-bucket';
let s3;

describe('Systemic S3 - Clear and delete', () => {
  beforeAll(async () => {
    s3 = await startS3Component(localstackConfig);
    await createBucket(s3, bucketName)
  });

  beforeEach(async () => {
    await emptyBucket(s3, bucketName)
  });

  it('should delete the bucket even if it has content or not', async () => {
    const bucketObjectKey = 'example1.txt'
    const bucketObjectBody = 'Example 1 text'
    const commandParamsUpload = {Bucket: bucketName, Key: bucketObjectKey, Body: bucketObjectBody}
    await s3.commandExecutor({commandParams: commandParamsUpload, commandName: 'putObject'});
    const {Body} = await s3.commandExecutor({commandParams:{Bucket: bucketName, Key: bucketObjectKey}, commandName: 'getObject'})

    const response = await streamToString(Body)
    expect(response).toEqual(bucketObjectBody);
    await s3.commandExecutor({commandParams:{Bucket:bucketName}, commandName:'clearAndDelete'})

    const {Buckets} = await s3.commandExecutor({commandParams:{}, commandName: 'listBuckets'})
    expect(Buckets.length).toEqual(0);

  });
  it('should fail if the bucket does not exists', async () => {
  });
  it('should fail if the parameters are wrong defined', async () => {
  });

});
