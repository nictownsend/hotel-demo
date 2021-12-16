const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const port = 8080;

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/booking", (req, res) => {
  const { email } = req.body;
  const reference = Array(16)
    .fill(0)
    .map((_, i) => Math.round(Math.random() * 16).toString(16))
    .join("");
  res.json({
    id: reference,
  });
  console.log(email);
});

app.listen(port, () => {
  console.log(`app listening on port ${port} `);
});
