# Web Scraper Serverless Example

## Motivation

Learn more about serverless with AWS and create a functional project that allow me save information about the exchange rate PEN / USD using AWS Lambda, DynamoDB, EventBridge and Serverless Framework.

## Prerequisites

- Create account on AWS
- Config credentials (https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)
- Explore sites for extract exchange rates

## Built using

- [Serverless](https://www.serverless.com/)
- [AWS DynamoDB](https://aws.amazon.com/es/dynamodb/)
- [AWS Lambda](https://aws.amazon.com/es/lambda/)
- [AWS EventBridge](https://aws.amazon.com/es/eventbridge/)
- [Node.js](https://nodejs.org/en/)
- [puppeteer](https://github.com/puppeteer/puppeteer)
- [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda)
- [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)
- [uuid](https://github.com/uuidjs/uuid)
- [prettier](https://github.com/prettier/prettier)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

## Installation

Use yarn or npm for install dependencies.

```
yarn install
```

Then you should update the env.example.yml and change the name by env.yml. This file contains the sites from which we will extract the exchange rates.

Now we go to deploy our changes and create the infrastructure on AWS.

```
serverless deploy
```

## Usage

You should go to Amazon EventBridge and create a rule for run the lambda function each certain time.

After that you could go to DynamoDB, select the table "rates" and you will see the extract data.

That's all!
