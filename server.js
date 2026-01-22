const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

let ledMode = "OFF"; // OFF | ON | BLINK

// Serve UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get LED mode (ESP32 reads this)
app.get("/get-led", (req, res) => {
  res.json({ mode: ledMode });
});

// Update LED mode (UI sends this)
app.post("/update-led", (req, res) => {
  const { mode } = req.body;
  if (["ON", "OFF", "BLINK"].includes(mode)) {
    ledMode = mode;
  }
  res.json({ status: "ok", mode: ledMode });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
