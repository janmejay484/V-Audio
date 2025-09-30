import styles from "../styles/Hero.module.css";
import { Button, Typography } from "@mui/material";
import GraphicEqIcon from "@mui/icons-material/GraphicEq"; // animated feel icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Hero() {
  return (
    <section className={styles.hero}>
      {/* Left content */}
      <div className={styles.textContent}>
        <Typography variant="h2" className={styles.heading}>
          Turn Videos into Music 🎶
        </Typography>
        <Typography variant="h6" className={styles.subtext}>
          Paste a YouTube link or upload your video and get crystal-clear MP3 audio in just a few seconds.
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className={styles.cta}
        >
          Try Now
        </Button>
      </div>

      {/* Right animated content */}
      <div className={styles.animation}>
        <div className={styles.circle}>
          <GraphicEqIcon className={styles.eqIcon} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
