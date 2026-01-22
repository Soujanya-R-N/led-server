const express = require("express");
const app = express();

// Middleware to read JSON
app.use(express.json());

// LED state stored in server
let ledState = "OFF";

/* ---------------- BASIC TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("Server is running");
});

/* ---------------- ESP32 API ---------------- */

// ESP32 asks: LED ON or OFF?
app.get("/get-led", (req, res) => {
  res.json({ led: ledState });
});

// ESP32 updates LED status
app.post("/update-led", (req, res) => {
  if (req.body.led) {
    ledState = req.body.led;
  }
  res.send("OK");
});

/* ---------------- WEB BUTTONS ---------------- */

// Turn LED ON from browser
app.get("/on", (req, res) => {
  ledState = "ON";
  res.send("LED turned ON");
});

// Turn LED OFF from browser
app.get("/off", (req, res) => {
  ledState = "OFF";
  res.send("LED turned OFF");
});

/* ---------------- PORT (VERY IMPORTANT) ---------------- */

// Railway gives dynamic PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
