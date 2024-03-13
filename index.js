const express = require("express");
const routes = require("./route");
const cron = require("node-cron");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(express.json());

// Define the URL for the GET request
const apiUrl = `http://localhost:${process.env.PORT}/api/mail/list/${process.env.EMAIL}`;

async function fetchData() {
  try {
    await axios.get(apiUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Schedule the cron job to run every 5 minutes
cron.schedule("* * * * *", () => {
  console.log("Fetching data...");
  fetchData();
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port ", process.env.PORT);
});

app.get("/", async (req, res) => {
  res.send("Welcome to Gmail API with NodeJS");
});

app.use("/api", routes);
