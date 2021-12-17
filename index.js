const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { SESClient } = require("@aws-sdk/client-ses");

const sesClient = new SESClient(process.env.REGION);
const port = 8080;

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/booking", async (req, res) => {
  const { email, room, checkIn, checkOut } = req.body;
  const reference = Array(16)
    .fill(0)
    .map((_, i) => Math.round(Math.random() * 16).toString(16))
    .join("");
  try {
    await sesClient.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [email],
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

app.listen(port, () => {
  console.log(`app listening on port ${port} `);
});
