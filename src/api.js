'use strict';

const AWS = require('aws-sdk');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const RATE_TABLE = 'rates';
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get('/last', async function(req, res) {
  const params = {
    TableName: RATE_TABLE,
    IndexName: 'source-index',
    KeyConditionExpression: '#source_table = :source',
    ExpressionAttributeValues: {
      ':source': 'Rextie',
    },
    ExpressionAttributeNames: {
      '#source_table': 'source',
    },
    Limit: 10
  }

  try {
    const { Items } = await dynamoDbClient.query(params).promise();
    // const { buy, sell, source, date } = Item;
    console.log('Items', Items);
    res.json(Items);
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ error: 'Could not retrieve the last record.' });
  }
});

app.get('/example', async function(req, res) {
  const params = {
    TableName: RATE_TABLE,
    Key: {
      id: '00a02be7-10af-4f84-82cc-2d6585b48d5a'
    }
  }

  try {
    const { Item } = await dynamoDbClient.get(params).promise();

    if (Item) {
      const { buy, sell, source, date } = Item;
      res.json({buy, sell, source, date});
    } else {
      res.status(404).json({ error: 'Not found the last record.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve the last record.' });
  }
});

module.exports.handler = serverless(app);