const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const utils = require("./utils");
const dotenv = require("dotenv");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

// read .env file and add it to process.env
dotenv.config();
// use the default env if .env is  not set.
if (
  !(
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
  )
) {
  utils.overwriteEnv(".env.default.development");
}

webpush.setVapidDetails(
  "mailto:test@test.com",
  process.env.publicVapidKey,
  process.env.privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscript object
  const subscription = req.body;

  console.log("subscription", subscription);

  // send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({
    title: "Push Test",
  });

  setInterval(() => {
    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch((err) => console.log(err));
  }, 5000);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`server running on port ${port}`));
