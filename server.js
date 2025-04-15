require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save-order", async (req, res) => {
  try {
    const data = req.body;

    const response = await fetch(process.env.APPSCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await response.text();

    if (response.ok) {
      console.log("✅ ส่งข้อมูลไปยัง Google Sheets สำเร็จ");
      res.status(200).json({ message: "บันทึกข้อมูลสำเร็จ", result: text });
    } else {
      console.error("❌ ส่งข้อมูลไปยัง Google Sheets ล้มเหลว", text);
      res.status(500).json({ message: "เกิดข้อผิดพลาด", error: text });
    }
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
