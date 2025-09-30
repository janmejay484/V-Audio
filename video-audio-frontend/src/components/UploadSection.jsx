import { useState } from "react";
import styles from "../styles/UploadSection.module.css";
import { Button, TextField, Typography, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import YouTubeIcon from "@mui/icons-material/YouTube";

function UploadSection({ setLoading }) {
  const [file, setFile] = useState(null);
  const [ytUrl, setYtUrl] = useState("");

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a video!");

    const formData = new FormData();
    formData.append("video", file);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/extract", {
        method: "POST",
        body: formData,
      });
      const blob = await response.blob();
      downloadBlob(blob, "audio.mp3");
    } catch {
      alert("Error extracting audio");
    }
    setLoading(false);
  };

  const handleYoutubeSubmit = async (e) => {
    e.preventDefault();
    if (!ytUrl) return alert("Enter YouTube URL!");

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: ytUrl }),
      });
      const blob = await response.blob();
      downloadBlob(blob, "audio.mp3");
    } catch {
      alert("Error extracting from YouTube");
    }
    setLoading(false);
  };

  return (
    <section className={styles.upload}>
      <Paper className={styles.card} elevation={3}>
        <Typography variant="h5" className={styles.heading}>
          Upload or Paste YouTube Link
        </Typography>

        {/* File Upload */}
        <form onSubmit={handleFileSubmit} className={styles.form}>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className={styles.input}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Extract from File
          </Button>
        </form>

        {/* Divider */}
        <Typography variant="h6" className={styles.orText}>
          OR
        </Typography>

        {/* YouTube URL */}
        <form onSubmit={handleYoutubeSubmit} className={styles.form}>
          <TextField
            fullWidth
            placeholder="https://youtube.com/..."
            value={ytUrl}
            onChange={(e) => setYtUrl(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            startIcon={<YouTubeIcon />}
          >
            Extract from YouTube
          </Button>
        </form>
      </Paper>
    </section>
  );
}

export default UploadSection;
