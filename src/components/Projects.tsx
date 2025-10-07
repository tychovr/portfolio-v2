import { AnimatePresence, useInView } from "motion/react";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "./input/Button";
import { ProjectType } from "../types";
import Project from "./container/Project";

export default function Projects() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects: ProjectType[] = [
    {
      title: "50five Mobile App",
      description:
        "Mobile app for managing, finding, and filtering 420,000+ EV charging stations across Europe. Includes charge point management features, real-time status updates, and remote control for operators. Focused on intuitive UX, fast search, and scalable infrastructure.",
      imagePath: "50five_thumbnail.png",
      technologies: ["React Native", "GraphQL", "Apollo Client", "Luxon"],
    },
    {
      title: "Operations Dashboard",
      description:
        "Automated system for real-time monitoring and automatic resetting of EV charge stations on error. Includes event logging, filtering, and instant operator feedback.",
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
      title: "Build at Home",
      description:
        "Web app connecting schools worldwide to share and collaborate on projects. Built in an international team, focused on global knowledge exchange.",
      imagePath: "buildathome_thumbnail.png",
      technologies: ["Next.js", "Node.js"],
      demo: "https://buildathome.online/",
    },
    {
      title: "Portfolio",
      description:
        "Personal portfolio site showcasing projects and skills. Built from scratch with modern, responsive design and interactive animations.",
      imagePath: "portfolio_thumbnail.png",
      technologies: ["React", "Typescript", "Motion", "Node.js"],
      demo: "https://tychovanrosmalen.com",
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
          <h2 className="text-4xl sm:text-5xl mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of recent work demonstrating technical expertise across
            various domains
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
            {showAllProjects ? "Show Less" : "View All Projects"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
