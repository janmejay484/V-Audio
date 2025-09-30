import styles from "../styles/Header.module.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

function Header() {
  return (
    <AppBar position="sticky" className={styles.header} elevation={0}>
      <Toolbar className={styles.toolbar}>
        <div className={styles.brand}>
          <MusicNoteIcon className={styles.icon} />
          <Typography variant="h6" className={styles.title}>
            Video → Audio Extractor
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
