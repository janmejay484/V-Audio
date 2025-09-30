import express from "express";
import multer from "multer";
import { exec } from "child_process";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app= express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// 1️⃣ Upload file → extract audio
app.post("/extract", upload.single("video"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = path.join(__dirname, `output-${Date.now()}.mp3`);

  const cmd = `ffmpeg -i "${inputPath}" -q:a 0 -map a "${outputPath}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("FFmpeg error:", stderr);
      return res.status(500).json({ error: "Error extracting audio" });
    }

    if (!fs.existsSync(outputPath)) {
      return res.status(500).json({ error: "Audio file not created" });
    }

    res.download(outputPath, "audio.mp3", () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

// 2️⃣ YouTube URL → extract audio
app.post("/youtube", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  const outputPath = path.join(__dirname, `yt-audio-${Date.now()}.mp3`);
  const ytdlpPath = path.join(__dirname, "yt-dlp.exe"); // local yt-dlp.exe
  const ffmpegPath = "C:\\Users\\hp\\Downloads\\ffmpeg-8.0-full_build\\ffmpeg-8.0-full_build\\bin\\ffmpeg.exe";

  const cmd = `"${ytdlpPath}" -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" -o "${outputPath}" ${url}`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("yt-dlp error:", stderr);
      return res.status(500).json({ error: "Error downloading audio" });
    }

    if (!fs.existsSync(outputPath)) {
      console.error("yt-dlp did not create file:", stderr);
      return res.status(500).json({ error: "Audio file not created" });
    }

    res.download(outputPath, "audio.mp3", () => {
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(5000, () =>
  console.log("✅ Backend running at http://localhost:5000")
);
