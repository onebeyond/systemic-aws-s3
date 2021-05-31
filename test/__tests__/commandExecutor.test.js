const {
  ListObjectsCommand,
  DeleteObjectCommand,
  PutObjectCommand
} = require("@aws-sdk/client-s3");

const {createBucket} = require('../helpers/createBucket')
const {deleteBucket} = require('../helpers/deleteBucket')
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
    await deleteBucket(s3, bucketName)
  });

  beforeEach(async () => {

    const res = await s3.client.send(new ListObjectsCommand({
      Bucket: bucketName,
    }));

    if (res.Contents) {
      await Promise.all(
        res.Contents.map((object) => s3.client.send(new DeleteObjectCommand({
          Bucket: bucketName,
          Key: object.Key,
        })))
      );
    }
  });

  it('should execute the "GetObject" command and retrieve it', async () => {
    const bucketObjectKey = 'example1.txt'
    const bucketObjectBody = 'Example 1 text'
    await s3.uploadObject({bucketName, bucketObjectKey, bucketObjectBody});
    const commandParams = { Bucket: bucketName, Key: bucketObjectKey }
    const {Body} = await s3.commandExecutor({commandParams, commandName: 'getObject'})

    const response = await streamToString(Body)
    expect(response).toEqual(bucketObjectBody);
  });

  it('should fail trying to get an object not stored in the bucket', async () => {
    const bucketObjectKey = 'example1.txt'
    const commandParams = { Bucket: bucketName, Key: bucketObjectKey }
    const commandName = 'getObject'
    await expect(s3.commandExecutor({commandParams, commandName}))
      .rejects
      .toThrowError(new Error('NoSuchKey'));
  });

  it.skip('should list 2 objects stored in the bucket', async () => {
    const bucketObjectKey1 = 'example1.txt'
    const bucketObjectBody1 = 'Example 1 text'
    const bucketObjectKey2 = 'example2.txt'
    const bucketObjectBody2 = 'Example 2 text'

    await s3.uploadObject({
      Bucket: bucketName,
      Key: bucketObjectKey1,
      Body: bucketObjectBody1
    });

    await s3.client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: bucketObjectKey2,
      Body: bucketObjectBody2
    }));

    const res = await s3.listObjects({bucketName});

    expect(res.Contents).toHaveLength(2);
    expect(res.Contents[0].Key).toBe('example1.txt');
    expect(res.Contents[1].Key).toBe('example2.txt');
  });



});
