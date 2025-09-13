// index.js
const axios = require("axios");
const FormData = require("form-data");

module.exports = async (req, res) => {
  // header CORS bebasin semua origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // preflight CORS OK
  }

  if (req.method === "POST") {
    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      const form = new FormData();
      form.append("files[]", buffer, {
        filename: "upload-" + Date.now(),
        contentType: "application/octet-stream"
      });

      const pomf = await axios.post("https://pomf.lain.la/upload.php", form, {
        headers: form.getHeaders()
      });

      return res.status(200).json({ url: pomf?.data?.files?.[0]?.url || null });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(200).json({ message: "Pomf Proxy API is running!" });
};
