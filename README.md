# Systemic AWS S3

Systemic wrapper for [AWS S3 SDK v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html).
## How to test

Set up / tear down local resources running

```bash
npm run infra:up
npm run infra:down
```

Once resources are up you can test the component running one of this commands

```bash
# all tests will be executed once
npm run test

# tests will be executed every time code changes (useful when coding)
npm run test:watch
```
