const initS3 = require('../../index');
const s3Component = initS3();

const startS3Component = config => s3Component.start(config);

module.exports = {
  startS3Component
}
