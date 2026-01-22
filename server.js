const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Serve HTML
app.use(express.static(__dirname));

// LED state
let ledState = "OFF";

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ESP32 / UI asks LED state
app.get("/get-led", (req, res) => {
  res.json({ led: ledState });
});

// ESP32 / UI updates LED state
app.post("/update-led", (req, res) => {
  if (req.body.led) {
    ledState = req.body.led;
  }
  res.json({ status: "OK", led: ledState });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
