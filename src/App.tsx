import React, { useEffect } from "react";
import "./styles/globals.css";
import Toast from "./components/container/Toast";
import ScrollToTop from "./components/input/ScrollToTop";
import { useTranslation } from "react-i18next";
import i18n from "./translations/i18n";
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    const sectionTitles = [
      { id: "welcome", title: t("navigation.welcome") },
      { id: "about", title: t("navigation.about") },
      { id: "skills", title: t("navigation.skills") },
      { id: "projects", title: t("navigation.projects") },
      { id: "contact", title: t("navigation.contact") },
    ];

    const sectionElements = sectionTitles.map(({ id }) => {
      if (id === "welcome") {
        return { id, el: document.body };
      }
      return { id, el: document.getElementById(id) };
    });

    function onScroll() {
      let currentTitle = "Welcome";
      for (let i = 1; i < sectionElements.length; i++) {
        const { el } = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            currentTitle = sectionTitles[i].title;
          }
        }
      }
      document.title = `${currentTitle} - Tycho van Rosmalen`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-background" key={i18n.language}>
      <Header />
      <main>
        <Welcome />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Toast />
    </div>
  );
}

export default App;
