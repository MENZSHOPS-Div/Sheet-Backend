require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔎 Route สำหรับทดสอบใน browser
app.get("/", (req, res) => {
  res.send("Google Sheet Backend is running ✅");
});

// 📤 Route สำหรับรับข้อมูล order แล้วส่งไปยัง Google Sheets
app.post("/save-order", async (req, res) => {
  try {
    const response = await axios.post(process.env.APPSCRIPT_URL, req.body);
    res.status(200).json({ status: "Saved to sheet", data: response.data });
  } catch (error) {
    console.error("❌ Error sending to Google Sheet:", error.message);
    res.status(500).json({ status: "Failed to save", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
