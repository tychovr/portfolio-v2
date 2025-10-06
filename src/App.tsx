import React, { useEffect } from "react";
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

function App() {
  useEffect(() => {
    const sectionTitles = [
      { id: "welcome", title: "Welcome" },
      { id: "about", title: "About" },
      { id: "skills", title: "Skills" },
      { id: "projects", title: "Projects" },
      { id: "contact", title: "Contact" },
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
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
