var aws = require("aws-sdk");
var ses = new aws.SES({
  region: "<region>"
});
exports.handler = function(event) {
  var message = JSON.parse(event.Records[0].Sns.Message);
  console.info('received event from SNS', message);

  let productDetails = "";

  message.items.forEach((futureEvent) => {
    productDetails = productDetails + "<tr><td>" + futureEvent.productName + "</td><td>" + futureEvent.quantity + "</td><td>" + futureEvent.amount + "</td></tr>";
  })

  var params = {
    Destination: {
      ToAddresses: [message.emailId],
    },
    Message: {
      Body: {
        Text: {
          Data: `Hello,\n\nYour Device Validation Token is ${message.orderId}\nSimply copy this token and paste it into the device validation input field.`
        },
        Html: {
          Data: `<html><head><title>Order Confirmation</title><style>h1{color:#f00;}</style></head><body><h1>Hello ${message.emailId} ,</h1><div>Thank you for Placing the Order ${message.orderId}, it is sucessfully placed with below Items.<br><br><br>
                 <div><table border="1" style="border-collapse: collapse;">
                 <tbody>
                    <tr>
                      <th>ProductName</th>
                      <th>Quantity</th>  
                      <th>Price</th>
                    </tr>
                    ${productDetails} </tbody><tfoot>
                    <tr>
                      <td colspan="2">Total</td>
                      <td>${message.total}</td>
                    </tr>
                  </tfoot>
                </table></div> 
                <div><p>We started with shipment of these items, it should reach you on time.</p></div>
                </body>
                <footer>
                  <p>Thank you so much</p>
                </footer>
                </html>`
        }
      },

      Subject: {
        Data: "Order Confirmation Email"
      },
    },
    Source: "tamibe@gmail.com",
  };

  return ses.sendEmail(params).promise()
};
