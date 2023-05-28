'use strict'

const AWS = require('aws-sdk');

const updateItem = async (event) => {

	const { itemStatus } = JSON.parse(event.body);
	const { id } = event.pathParameters;

	const dynamoDB = new AWS.DynamoDB.DocumentClient();

	await dynamoDB.update({
		TableName: "ItemTableNew",
		Key: { id },
		UpdateExpression: 'set itemSatus = :ItemStatus',
		ExpressionAttributeValues: {
			':ItemStatus': itemStatus
		},
		ReturnValues: "ALL_NEW"
	}).promise();

	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				msg: 'item update'
			}
		),
	}
}

module.exports = {
	hendler:updateItem
}