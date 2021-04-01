const initS3 = require('../../index');

const s3Component = initS3();
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
    });

    it('should fail', () => {
        fail('Test not ready');
    });
});
