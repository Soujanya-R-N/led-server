const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// LED state
let ledState = "OFF";

/* ---------- API ---------- */

// ESP32 / UI get LED state
app.get("/get-led", (req, res) => {
  res.json({ led: ledState });
});

// Update LED state
app.post("/update-led", (req, res) => {
  const { led } = req.body;
  if (led === "ON" || led === "OFF") {
    ledState = led;
  }
  res.json({ status: "ok", led: ledState });
});

/* ---------- UI ---------- */

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* ---------- START SERVER ---------- */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
