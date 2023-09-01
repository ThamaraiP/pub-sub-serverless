exports.handler =  async (event, context) => {
  
  
  var AWS = require("aws-sdk");
  
  let message =  "Order Placed Successfully";
  console.info('Publish to SNS', event);
  
  
  const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  await sns
    .publish(
      {
        TopicArn: "arn:aws:sns:<region>:<account>:<topicName>",
        Message: JSON.stringify(event)
      },
    ).promise();
  
  
  let responseBody = {
        message: message,
        orderId: event.orderId
    };

    
    return responseBody;


};
