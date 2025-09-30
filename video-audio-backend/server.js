import express from "express";
import multer from "multer";
import { exec } from "child_process";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// --- Helper paths for Render ---
const COOKIE_PATH = path.join(__dirname, "cookies.txt");
const FFMPEG_PATH = process.env.RENDER ? "/usr/bin/ffmpeg" : "ffmpeg";

// 🔹 Extract from uploaded file
app.post("/extract", upload.single("video"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = path.join(__dirname, `output-${Date.now()}.mp3`);

  const cmd = `"${FFMPEG_PATH}" -y -i "${inputPath}" -vn -ar 44100 -ac 2 -b:a 192k "${outputPath}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err || !fs.existsSync(outputPath)) {
      console.error("FFmpeg error:", stderr);
      return res.status(500).json({ error: "Error extracting audio" });
    }
    res.download(outputPath, "audio.mp3", () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

// 🔹 Extract from YouTube
app.post("/youtube", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  const tmpDir = path.join("/tmp", `yt-${Date.now()}`);
  fs.mkdirSync(tmpDir);

  const outputPath = path.join(tmpDir, "audio.mp3");
  const cookieArg = fs.existsSync(COOKIE_PATH) ? `--cookies "${COOKIE_PATH}"` : "";

  const cmd = `python3 -m yt_dlp -x --audio-format mp3 --audio-quality 0 --ffmpeg-location "${FFMPEG_PATH}" ${cookieArg} -o "${outputPath}" "${url}"`;

  exec(cmd, (err, stdout, stderr) => {
    console.log("yt-dlp stdout:", stdout);
    console.log("yt-dlp stderr:", stderr);

    if (err || !fs.existsSync(outputPath)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      return res.status(500).json({ error: "yt-dlp failed", details: stderr });
    }

    res.download(outputPath, "audio.mp3", () => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });
  });
});

// 🔹 Dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
