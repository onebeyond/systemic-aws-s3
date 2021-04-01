const { CreateBucketCommand, ListObjectsCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const initS3 = require('../../index');

const s3Component = initS3();
const bucketName = 'test-bucket';
let s3

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
        }))
    });

    beforeEach(async () => {
        const res = await s3.client.send(new ListObjectsCommand({
            Bucket: bucketName,
        }));

        if (res.Contents) {
            res.Contents.map((object) => s3.client.send(new DeleteObjectCommand({
                Bucket: bucketName,
                Key: object.Key,
            })))
        }
    });

    it('should fail', async () => {
        fail('Test not ready');
    });
});
