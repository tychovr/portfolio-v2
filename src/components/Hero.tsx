import React from "react";
import { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./input/Button";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Tycho van Rosmalen";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-primary text-lg">Hello, I'm</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl mb-2 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {displayText}
              <motion.span
                className="inline-block w-1 h-16 lg:h-20 bg-primary ml-2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.h1>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl mb-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              Software Engineer
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              I build exceptional digital experiences through clean code and
              thoughtful design. Passionate about creating scalable applications
              that solve real-world problems.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              <Button
                onClick={scrollToAbout}
                className="px-8 py-5 items-center"
              >
                <span>View My Work</span>
                <ArrowDown className="h-5 w-5 mx-auto" />
              </Button>

              <a
                href="/documents/CV - Tycho van Rosmalen.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  className="px-8 py-5 flex items-center"
                >
                  <span className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </span>
                </Button>
              </a>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-start space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              {[
                { icon: Github, href: "https://google.com", label: "GitHub" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/tycho-van-rosmalen/",
                  label: "LinkedIn",
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                {
                  icon: Mail,
                  href: "mailto:tychovanrosmalen12@gmail.com?subject=Contact%20from%20Portfolio",
                  label: "Email",
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-border bg-card">
                <img
                  src="/images/me.jpg"
                  alt="Tycho van Rosmalen - Software Engineer"
                  className="w-full h-full object-cover object-[30%_center]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
