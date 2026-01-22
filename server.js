const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

let ledState = "OFF";

// Serve UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ESP32 reads LED state
app.get("/get-led", (req, res) => {
  res.json({ led: ledState });
});

// Update LED state
app.get("/update-led", (req, res) => {
  if (req.query.led) {
    ledState = req.query.led;
  }
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
