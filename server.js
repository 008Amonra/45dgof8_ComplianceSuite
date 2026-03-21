const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, "_");
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  const allowed = [".mp4", ".mov", ".webm"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only MP4, MOV, and WEBM files are allowed."));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024
  }
});

app.use(express.static(__dirname));

app.post("/upload", upload.array("videos", 10), (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ error: "No files uploaded." });
    }

    const files = req.files.map((file) => ({
      originalName: file.originalname,
      savedAs: file.filename,
      size: file.size,
      path: file.path
    }));

    return res.json({
      message: "Upload successful.",
      files
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error during upload." });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(400).json({
    error: err.message || "Upload error."
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
