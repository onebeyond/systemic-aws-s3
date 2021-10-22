const {createBucket} = require('../helpers/createBucket')
const {deleteBucket} = require('../helpers/deleteBucket')
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

  afterAll(async () => {
    await emptyBucket(s3, bucketName)
    await deleteBucket(s3, bucketName)
  });

  beforeEach(async () => {
    await emptyBucket(s3, bucketName)
  });

  it('should delete the bucket even if it has content or not', async () => {
  });
  it('should fail if the bucket does not exists', async () => {
  });
  it('should fail if the parameters are wrong defined', async () => {
  });

  it.skip('should throw an error trying to execute an unexisting command', async () => {
      await expect(s3.commandExecutor({commandParams: {}, commandName: 'unexistingCommand'}))
        .rejects
        .toThrowError('client[commandName] is not a function');
  });

});
