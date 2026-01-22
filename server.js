const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

let ledState = "OFF";

// Serve UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get LED state
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
