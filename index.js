const express = require("express");
const path = require("path");

const port = 8080;

const app = express();
app.use(express.static(path.resolve(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`app listening on port ${port} `);
});
