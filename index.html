const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const upload = multer();
const port = 3000;

app.use(cors());

// fungsi upload ke Pomf
async function uploadToPomf(buffer) {
  const form = new FormData();
  form.append("files[]", buffer, {
    filename: "upload-" + Date.now(),
    contentType: "application/octet-stream"
  });

  const res = await axios.post("https://pomf.lain.la/upload.php", form, {
    headers: {
      ...form.getHeaders(),
      origin: "https://pomf.lain.la",
      "user-agent": "Postify/1.0.0"
    }
  });

  return res?.data?.files?.[0]?.url || null;
}

// endpoint upload proxy
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const url = await uploadToPomf(req.file.buffer);

    if (!url) {
      return res.status(500).json({ error: "Upload failed" });
    }

    res.json({ success: true, url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// default route
app.get("/", (req, res) => {
  res.json({ message: "Pomf Proxy API is running!" });
});

// jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
