import React, { useEffect, useState } from "react";
import "./styles/globals.css";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Toast from "./components/container/Toast";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/input/ScrollToTop";
import Welcome from "./components/Welcome";
import { useTranslation } from "react-i18next";
import i18n from "./translations/i18n";

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
  }, [i18n.language]);

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
