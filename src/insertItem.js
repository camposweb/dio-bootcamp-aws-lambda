'use strict'

/* import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb' */

const AWS  = require('aws-sdk');

const insertItem = async (event) => {

	const { item } = JSON.parse(event.body);
	const createdAt = new Date().toISOString();
	const id = crypto.randomUUID();

	const client = new AWS.DynamoDB.DocumentClient();

	const newItem = {
		id,
		item,
		createdAt,
		ItemStatus: false,
	};

	await client.put(
		{
			TableName: "ItemTableNew",
			Item: newItem
		}
	).promise();

	return {
		statusCode: 200,
		body: JSON.stringify(newItem)
	}
}

module.exports = {
	handler:insertItem
}

