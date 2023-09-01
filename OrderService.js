exports.handler =  async (event, context) => {
  
  
  var AWS = require("aws-sdk");
  var sns = new AWS.SNS();
  let responseCode = 200;
  console.info('Publish to SNS', event);
  await sns.publish({
      TopicArn: "arn:aws:sns:ap-south-1:982353931640:Order",
      Message: JSON.stringify(event)
  }, function(err, data) {
      if(err) {
          console.error('error publishing to SNS');
          
      } else {
          console.info('message published to SNS');
          
      }
  }).promise();
  
  let responseBody = {
        message: "Order Placed Successfully",
        orderId: event.orderId
    };

  
  let response = {
        statusCode: responseCode,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response))
    return responseBody;


};
