import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableProduct,
    Item: {
      // The attributes of the item to be created
      userid: event.requestContext.identity.cognitoIdentityId, // The id of the author
      productId: data.productid, // A unique uuid
      description: data.description, // Parsed from request body
      color: data.color, // Parsed from request body
      size: data.size,
      quantity: data.quantity,
      amount: data.amount,
      costprice: data.costprice,
      costsale: data.costsale,
      image: data.attachment,
      createdAt: Date.now(), // Current Unix timestamp
      //productid description color size quantity amount costprice costsale
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});