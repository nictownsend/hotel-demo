/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-west-2" });

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/****************************
 * Example post method *
 ****************************/

app.post("/api/booking", async (req, res) => {
  const { email, room, checkIn, checkOut } = req.body;
  const reference = Array(16)
    .fill(0)
    .map((_, i) => Math.round(Math.random() * 16).toString(16))
    .join("");
  try {
    await ses.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [email],
          BccAddresses: ["ntownsend@gmail.com"],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `<h1>Thank you for booking</h1><h2>Booking details:</h2><div>Room: ${room}<br/>Check In: ${checkIn}<br/>Check Out: ${checkOut}</div>`,
            },
          },
        },
        Subject: {
          Data: `Your booking #${reference}`,
        },
        Source: "no-reply@townsendhotels.co.uk",
      })
    );

    res.json({
      id: reference,
    });
  } catch (error) {
    res.status(500);
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
