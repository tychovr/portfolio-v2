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
        "The 50five e-Mobility app was developed to make electric driving more accessible and user-friendly. With the app, users can easily find charging stations across Europe and filter based on personal preferences, such as availability, connector type, and charging capacity.\n\nThe network covers more than 420,000 charging points across Europe, ensuring that drivers always have access to a suitable location. The focus is on delivering an intuitive user experience, with fast search and filter options tailored to the user’s needs.\n\nThe app elevates electric driving to the next level by combining reliability, ease of use, and scalability, supporting the growth of sustainable mobility.",
      imagePath: "50five_thumbnail.png",
      technologies: ["React Native", "GraphQL", "Apollo Client", "Luxon"],
    },
    {
      title: "Operations Dashboard",
      description:
        "Operations Dashboard was designed to give operators unambiguous visibility and control over resetting EV charge stations in case of errors. The system monitors real-time events from the backend and provides instant feedback on reset attempts.\n\nAll reset activities are logged and presented in an easy-to-use table format, allowing operators to filter and sort by parameters such as date, reset type, malfunction, and status. This enables easy identification of recurring issues and monitoring of performance over time.\n\nBy bringing reset operations together into one intuitive interface, the dashboard maximizes operational efficiency, reduces downtime, and allows for faster response to charging station faults.",
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
        "In my third year of study, we were lucky enough to have the opportunity to work on a team project to design and build a web application. The project was not only a technical challenge, but also one to learn in an international environment, as we were challenged to travel to Bologna, Italy, and finalize and present our efforts.\n\nThe motive of the application was to unite schools across the globe and create an environment where students and teachers could share ideas on different projects. Through global collaboration, the application aimed to encourage exchange of knowledge, innovation, and cross-cultural awareness.\n\nWorking on the project, I acquired useful knowledge in web development, team work, and cross-cultural collaboration that helped me enhance both my technical and communication abilities.",
      imagePath: "buildathome_thumbnail.png",
      technologies: ["Next.js", "Node.js"],
      demo: "https://buildathome.online/",
    },
    {
      title: "Portfolio",
      description:
        "My professional portfolio website was designed and developed to showcase my career progression, technical skills, and recent projects.\n\nIt features a modern, responsive theme for ultimate performance and accessibility with a sleek experience across all devices.\n\nThe site focuses on major work, includes interactive animations for engagement, and merges SEO best practices to guarantee maximum visibility.\n\nBy creating this project from scratch, I was able to combine front-end development, component-based design, and motion effects into a single solid, professional web presence",
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
