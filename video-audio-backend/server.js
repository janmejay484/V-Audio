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

// 🔹 Extract from uploaded file (with fallback)
app.post("/extract", upload.single("video"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = path.join(__dirname, `output-${Date.now()}.mp3`);

  // Primary ffmpeg command
  const cmdPrimary = `"${FFMPEG_PATH}" -y -i "${inputPath}" -vn -ar 44100 -ac 2 -b:a 192k "${outputPath}"`;

  exec(cmdPrimary, (err, stdout, stderr) => {
    console.log("ffmpeg primary stderr:", stderr);

    if (!err && fs.existsSync(outputPath)) {
      return res.download(outputPath, "audio.mp3", () => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    }

    // Fallback: try extracting best audio stream only
    console.warn("Primary file extraction failed, trying fallback…");

    const fallbackPath = path.join(__dirname, `fallback-${Date.now()}.mp3`);
    const cmdFallback = `"${FFMPEG_PATH}" -y -i "${inputPath}" -map a:0 -c:a libmp3lame -b:a 192k "${fallbackPath}"`;

    exec(cmdFallback, (fbErr, fbStdout, fbStderr) => {
      console.log("ffmpeg fallback stderr:", fbStderr);

      if (fbErr || !fs.existsSync(fallbackPath)) {
        fs.unlinkSync(inputPath);
        return res.status(500).json({ error: "ffmpeg failed on upload" });
      }

      res.download(fallbackPath, "audio.mp3", () => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(fallbackPath);
      });
    });
  });
});

// 🔹 Extract from YouTube (with fallback)
app.post("/youtube", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  const tmpDir = path.join("/tmp", `yt-${Date.now()}`);
  fs.mkdirSync(tmpDir);

  const outputPath = path.join(tmpDir, "audio.mp3");
  const rawPath = path.join(tmpDir, "yt-audio.webm"); // intermediate
  const cookieArg = fs.existsSync(COOKIE_PATH) ? `--cookies "${COOKIE_PATH}"` : "";

  // Step 1: Direct mp3 extraction
  const cmdPrimary = `python3 -m yt_dlp -x --audio-format mp3 --audio-quality 0 --ffmpeg-location "${FFMPEG_PATH}" ${cookieArg} -o "${outputPath}" "${url}"`;

  exec(cmdPrimary, (err, stdout, stderr) => {
    console.log("yt-dlp primary stderr:", stderr);

    if (!err && fs.existsSync(outputPath)) {
      return res.download(outputPath, "audio.mp3", () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      });
    }

    // Step 2: Fallback bestaudio → convert with ffmpeg
    console.warn("Primary YouTube extraction failed, trying fallback…");

    const cmdFallback = `python3 -m yt_dlp -f bestaudio --ffmpeg-location "${FFMPEG_PATH}" ${cookieArg} -o "${rawPath}" "${url}"`;

    exec(cmdFallback, (fbErr, fbStdout, fbStderr) => {
      console.log("yt-dlp fallback stderr:", fbStderr);

      if (fbErr || !fs.existsSync(rawPath)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        return res.status(500).json({ error: "yt-dlp failed", details: fbStderr });
      }

      const cmdConvert = `"${FFMPEG_PATH}" -y -i "${rawPath}" -vn -ar 44100 -ac 2 -b:a 192k "${outputPath}"`;

      exec(cmdConvert, (convErr, convStdout, convStderr) => {
        console.log("ffmpeg convert stderr:", convStderr);

        if (convErr || !fs.existsSync(outputPath)) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          return res.status(500).json({ error: "ffmpeg conversion failed" });
        }

        res.download(outputPath, "audio.mp3", () => {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        });
      });
    });
  });
});

// 🔹 Dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
