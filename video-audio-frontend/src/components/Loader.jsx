import styles from "../styles/Loader.module.css";
import { CircularProgress } from "@mui/material";

function Loader() {
  return (
    <div className={styles.overlay}>
      <CircularProgress size={70} thickness={4} sx={{ color: "#fff" }} />
      <p className={styles.text}>Extracting audio, please wait...</p>
    </div>
  );
}

export default Loader;
