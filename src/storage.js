const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');
const { avg } = require('./utils');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const now = new Date();

const save = async (data) => {
  const params = {
    TableName: 'rates',
    Item: {
      id: uuid(),
      source: data.source,
      date: now.toISOString(),
      buy: data.buy,
      sell: data.sell,
      avg: data.avg || avg(data),
    },
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

module.exports = {
  save,
};
