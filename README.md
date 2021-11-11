# Systemic AWS S3

A [Systemic](https://guidesmiths.github.io/systemic/#/) component for the [AWS S3 SDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html).

## How to use it

### Configuration

A typical, simple configuration looks like this:

```json
{
  "region": "us-east-1",
  "credentials": {
    "secretAccessKey": "test",
    "accessKeyId": "test"
  }
}
```

[Here](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html) you can finde the complete configuration interface of S3Client class constructor that set the region, credentials and other options.

### Initialize the component

As with any other [Systemic component](https://guidesmiths.github.io/systemic/#/?id=components), you can run it with the `start` method:

```js
const initAWSS3 = require('systemic-aws-s3');
const { start } = initAWSS3();

const api = await start({ config }); // configuration similar to the one above
```

### Call the API commands

As the AWS API has dozens of commands, intead of having one wrapper for each of them, the component exposes one single command `commandExecutor` that can be used to call any of the commands exposed by the api:

For example, to list all the objects in a specific bucket:

```js
const listObjectConfig = {
  commandParams: { Bucket: bucketName },
  commandName: 'listObjects'
}
const res = await api.commandExecutor(listObjectConfig);
```

You can check all the available commands [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/s3.html).

### Custom commands

In the future, this component will also expose some custom commands not supported by the official API.

## Guide for developers

### How to test it

You can test the whole test suite running one of these commands:

```bash
# all tests will be executed once
npm run test

# tests will be executed every time code changes (useful when coding)
npm run test:watch
```

In case that you want to just execute a certain test case, you can also use these scripts to up / tear down the infra.

```bash
npm run infra:up
npm run infra:down
```
