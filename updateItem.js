import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableProduct,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key:{productId: event.pathParameters.id},
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET productid = :productid, description = :description, color = :color, size = :size, quantity = :quantity, amount = :amount, costprice = :costprice, costsale = :costsale, image = :attachment",
    ExpressionAttributeValues: {
      ":productid": data.productid || null,
      ":description": data.description || null,
      ":color": data.color || null,
      ":size": data.size || null,
      ":quantity": data.quantity || null,
      ":amount": data.amount || null,
      ":costprice": data.costprice || null,
      ":costsale": data.costsale || null,
      ":attachment": data.attachment || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});