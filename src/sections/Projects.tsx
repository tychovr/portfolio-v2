import { AnimatePresence, useInView } from "motion/react";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/input/Button";
import { ProjectType } from "../types/types";
import Project from "../components/container/Project";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects: ProjectType[] = [
    {
      title: t("projects.projects.50five_app.title"),
      description: t("projects.projects.50five_app.description"),
      imagePath: "image.png",
      technologies: ["React Native", "GraphQL", "Apollo Client", "Luxon"],
      demo: "https://play.google.com/store/search?q=50five&c=apps&hl=nl",
    },
    {
      title: t("projects.projects.operations_dashboard.title"),
      description: t("projects.projects.operations_dashboard.description"),
      imagePath: "operationsdashboard_thumbnail.png",
      technologies: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "TypeORM",
        "Playwright",
      ],
    },
    {
      title: t("projects.projects.build_at_home.title"),
      description: t("projects.projects.build_at_home.description"),
      imagePath: "buildathome_thumbnail.png",
      technologies: ["Next.js", "Node.js"],
      demo: "https://buildathome.online/",
    },
    {
      title: t("projects.projects.portfolio.title"),
      description: t("projects.projects.portfolio.description"),
      imagePath: "portfolio_thumbnail.png",
      technologies: ["React", "Typescript", "Motion", "Node.js", "Express"],
      demo: "https://tychovanrosmalen.nl",
      github: "https://github.com/tychovr/portfolio-v2",
    },
  ];

  const firstProjects = projects.slice(0, 3);
  const hiddenProjects = projects.slice(3);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleProjects = () => {
    if (showAllProjects) {
      scrollToProjects();
      setShowAllProjects(false);
    } else {
      setShowAllProjects(true);
    }
  };

  return (
    <section id="projects" className="py-20 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">{t("projects.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("projects.description")}
          </p>
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {firstProjects.map((project, index) => (
              <Project project={project} index={index} />
            ))}
            {showAllProjects &&
              hiddenProjects.map((project, index) => (
                <Project project={project} index={index} />
              ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center"
          onClick={handleToggleProjects}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button className="text-center" size="lg">
            {showAllProjects
              ? t("button.show_less")
              : t("button.view_all_projects")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
