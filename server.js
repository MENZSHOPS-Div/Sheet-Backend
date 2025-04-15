require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running! ✅");
});

app.post("/push", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.line.me/v2/bot/message/broadcast",
      { messages: [{ type: "text", text: message }] },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
        },
      }
    );

    res.status(200).json({ status: "Message sent", response: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Failed", error: error.message });
  }
});

app.post("/save-order", async (req, res) => {
  try {
    const response = await axios.post(process.env.APPSCRIPT_URL, req.body);
    res.status(200).json({ status: "Saved to sheet", data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Failed to save", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
