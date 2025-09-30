import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UploadSection from "./components/UploadSection";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import styles from "./styles/App.module.css";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.app}>
      <Header />
      {loading && <Loader />}
      <Hero />
      <UploadSection setLoading={setLoading} />
      <Footer />
    </div>
  );
}

export default App;
