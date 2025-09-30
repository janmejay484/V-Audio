# 🎶 V-Audio — Video & YouTube to MP3 Converter

⚠️ **Note: This project is under development.**  
YouTube often blocks automated requests — so to use the **YouTube → MP3** feature, you’ll need refreshed cookies.  
Since this is a free version, cookies may expire. 👉 **Please contact me if you’d like to use it** and I’ll refresh access.  


Extract **high-quality MP3 audio** from uploaded video files or directly from YouTube links.  
V-Audio features a clean React frontend and a Node.js backend powered by **FFmpeg + yt-dlp**, deployable on **Vercel + Render**.

<p align="left">
  <a href="https://nodejs.org/"><img alt="Node" src="https://img.shields.io/badge/Node-20%2B-3C873A?logo=node.js&logoColor=white"></a>
  <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black"></a>
  <a href="https://mui.com/"><img alt="MUI" src="https://img.shields.io/badge/UI-Material%20UI-0081CB?logo=mui&logoColor=white"></a>
  <a href="https://ffmpeg.org/"><img alt="FFmpeg" src="https://img.shields.io/badge/Media-ffmpeg-red"></a>
  <a href="https://github.com/yt-dlp/yt-dlp"><img alt="yt-dlp" src="https://img.shields.io/badge/YT-dlp-333?logo=youtube&logoColor=red"></a>
  <a href="#"><img alt="License" src="https://img.shields.io/badge/License-MIT-black"></a>
</p>


---

## ✨ Features

- **File Upload Support** — upload `.mp4`, `.mov`, `.avi`, `.mkv` and extract clean `.mp3`.
- **YouTube to MP3** — paste any YouTube URL, instantly get audio using `yt-dlp`.
- **High Quality Output** — defaults to **192 kbps MP3**, with proper stereo conversion.
- **Cross-platform Deployment** — frontend on **Vercel**, backend on **Render**.
- **Simple UI** — Material UI card layout with file picker & YouTube input.
- **Automatic Cleanup** — temp files auto-deleted after download.

---

## 🖼️ Screenshots
 
<img width="1897" height="912" alt="image" src="https://github.com/user-attachments/assets/30173996-ae53-49f6-abd4-573611eca705" />
<img width="1900" height="922" alt="image" src="https://github.com/user-attachments/assets/f9151afa-4f2c-4bce-99ea-4f33c521303a" />


---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Material UI + CSS Modules
- **Backend**: Node.js (Express, Multer, CORS)
- **Media Processing**: FFmpeg + yt-dlp
- **Hosting**: Vercel (frontend) + Render (backend)

---

## 🚀 Quick Start

### 1) Clone & install
```bash
git clone https://github.com/<your-username>/v-audio.git
cd v-audio/video-audio-frontend
npm install
cd ../video-audio-backend
npm install
