const {
    ListObjectsCommand,
    DeleteObjectCommand,
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const {createBucket} = require('../helpers/createBucket')
const {deleteBucket} = require('../helpers/deleteBucket')
const {startS3Component} = require('../helpers/startS3Component')
const localstackConfig = require('../fixtures/localstackConfig')

const bucketName = 'test-bucket';
let s3;

describe('Systemic S3 - List object tests', () => {
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

    it('should list 2 objects stored in the bucket', async () => {
        await s3.client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: 'example1.txt',
            Body: 'Example 1 text'
        }));

        await s3.client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: 'example2.txt',
            Body: 'Example 2 text'
        }));

        const res = await s3.listObjects({ bucketName });

        expect(res.Contents).toHaveLength(2);
        expect(res.Contents[0].Key).toBe('example1.txt');
        expect(res.Contents[1].Key).toBe('example2.txt');
    });
});
