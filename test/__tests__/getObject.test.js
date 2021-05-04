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

describe('Systemic S3 - Get object tests', () => {
    beforeAll(async () => {
        s3 = await startS3Component(localstackConfig);
        await createBucket(s3,bucketName)
    });

    afterAll(async () => {
        await deleteBucket(s3,bucketName)
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

    it('should get an object stored in the bucket', async () => {
      const bucketObjectKey = 'example1.txt'
      const bucketObjectBody = 'Example 1 text'
        await s3.client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: bucketObjectKey,
            Body: bucketObjectBody
        }));

        const {Body} = await s3.getObject({ bucketName, bucketObjectKey});
        const response = await streamToString(Body)
        expect(response).toEqual(bucketObjectBody);
    });

    it('should fail trying to get an object not stored in the bucket', async() => {
      const bucketObjectKey = 'example1.txt'
      await expect(s3.getObject({ bucketName, bucketObjectKey}))
        .rejects
        .toThrowError(new Error('NoSuchKey'));
    });
});
