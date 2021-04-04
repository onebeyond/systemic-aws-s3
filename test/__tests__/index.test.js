const {
    CreateBucketCommand,
    ListObjectsCommand,
    DeleteObjectCommand,
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const initS3 = require('../../index');

const s3Component = initS3();
const bucketName = 'test-bucket';
let s3;

describe('Systemic S3 Component Tests', () => {
    beforeAll(async () => {
        s3 = await s3Component.start({
            config: {
                region: 'us-east-1',
                endpoint: 'http://localhost:4566',
                credentials: {
                    secretAccessKey: 'test',
                    accessKeyId: 'test',
                },
                forcePathStyle: true,
            }
        });

        await s3.client.send(new CreateBucketCommand({
            Bucket: bucketName,
        }));
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
