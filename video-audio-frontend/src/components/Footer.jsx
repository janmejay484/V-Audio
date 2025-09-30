import styles from "../styles/Footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.text}>
          © {new Date().getFullYear()} Video → Audio Extractor | Made by{" "}
          <strong>Janmejay Singh</strong>
        </p>
        <div className={styles.socials}>
          <a
            href="https://github.com/janmejay484"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/janmejay-singh484/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
