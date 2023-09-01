var aws = require("aws-sdk");
var ses = new aws.SES({ region: "ap-south-1" });
exports.handler = function (event) {
  var message = JSON. parse(event.Records[0].Sns.Message);
  console.info('received event from SNS', message);
  
  var params = {
    Destination: {
      ToAddresses: [message.emailId],
    },
    Message: {
      Body: {
        Text: { Data: JSON.stringify(message) },
      },

      Subject: { Data: "Order Confirmation Email" },
    },
    Source: "tamibe@gmail.com",
  };
 
  return ses.sendEmail(params).promise()
};
