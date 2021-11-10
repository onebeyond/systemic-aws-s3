const {createBucket} = require('../helpers/createBucket')
const {deleteBucket} = require('../helpers/deleteBucket')
const {emptyBucket} = require('../helpers/emptyBucket')
const {startS3Component} = require('../helpers/startS3Component')
const localstackConfig = require('../fixtures/localstackConfig')
const {streamToString} = require("../helpers/streamToString");

const bucketName = 'test-bucket';
let s3;

describe('Systemic S3 - Command executor', () => {
  beforeAll(async () => {
    s3 = await startS3Component(localstackConfig);
    await createBucket(s3, bucketName)
  });

  afterAll(async () => {
    await emptyBucket(s3, bucketName)
    await deleteBucket(s3, bucketName)
  });

  beforeEach(async () => {
    await emptyBucket(s3, bucketName)
  });

  it('should execute the "GetObject" command and retrieve it', async () => {
    const bucketObjectKey = 'example1.txt'
    const bucketObjectBody = 'Example 1 text'
    const commandParamsUpload = {Bucket: bucketName, Key: bucketObjectKey, Body: bucketObjectBody}

    await s3.commandExecutor({commandParams: commandParamsUpload, commandName: 'putObject'});
    const commandParams = {Bucket: bucketName, Key: bucketObjectKey}
    const {Body} = await s3.commandExecutor({commandParams, commandName: 'getObject'})

    const response = await streamToString(Body)
    expect(response).toEqual(bucketObjectBody);
  });

  it('should fail trying to get an object not stored in the bucket', async () => {
    const bucketObjectKey = 'example1.txt'
    const commandParams = {Bucket: bucketName, Key: bucketObjectKey}
    const commandName = 'getObject'
    await expect(s3.commandExecutor({commandParams, commandName}))
      .rejects
      .toThrowError(new Error('NoSuchKey'));
  });

  it('should list 2 objects stored in the bucket', async () => {

    const commandParams1 = {
      Bucket: bucketName,
      Key: 'example1.txt',
      Body: 'Example 1 text'
    }

    const commandParams2 = {
      Bucket: bucketName,
      Key: 'example2.txt',
      Body: 'Example 2 text'
    }

    await s3.commandExecutor({commandParams: commandParams1, commandName: 'putObject'})
    await s3.commandExecutor({commandParams: commandParams2, commandName: 'putObject'})

    const res = await s3.commandExecutor({commandParams: {Bucket: bucketName}, commandName: 'listObjects'})

    expect(res.Contents).toHaveLength(2);
    expect(res.Contents[0].Key).toBe('example1.txt');
    expect(res.Contents[1].Key).toBe('example2.txt');
  });

  it('should throw an error trying to execute an unexisting command', async () => {
      await expect(s3.commandExecutor({commandParams: {}, commandName: 'unexistingCommand'}))
        .rejects
        .toThrowError('s3Client[commandName] is not a function');
  });

});
