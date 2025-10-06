import { useInView } from "motion/react";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./container/Card";
import { Badge } from "./container/Badge";
import { Button } from "./input/Button";
import { Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  imagePath: string;
  technologies: string[];
  github?: string;
  demo?: string;
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects: Project[] = [
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
      technologies: ["React", "Typescript"],
      demo: "https://tychovanrosmalen.com",
      github: "https://github.com/tychovr/portfolio-v2",
    },
  ];

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

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

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="h-full border-border hover:border-primary/50 transition-colors overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={`images/${project.imagePath}`}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl mb-3">{project.title}</h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < project.description.split("\n").length - 1 && (
                          <br />
                        )}
                      </React.Fragment>
                    ))}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.github && (
                      <Button variant="outline" size="sm" className="flex-1">
                        {/* Only a single child is allowed for asChild */}
                        <a
                          href={project.github}
                          className="flex items-center justify-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="outline" size="sm" className="flex-1">
                        {/* Only a single child is allowed for asChild */}
                        <a
                          href={project.demo}
                          className="flex items-center justify-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Demo</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          onClick={() => setShowAllProjects(!showAllProjects)}
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
