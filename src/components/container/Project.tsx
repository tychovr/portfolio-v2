import React from "react";
import { Button } from "../input/Button";
import { Card, CardContent } from "./Card";
import { Badge } from "./Badge";
import { ProjectType } from "../../types";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
  project: ProjectType;
  index: number;
}

const Project = ({ project, index }: ProjectProps) => {
  console.log(project);
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        key={index}
        className="h-full flex flex-col" // Ensure the card fills the grid cell vertically
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="h-full flex flex-col border-border hover:border-primary/50 transition-colors overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              src={`images/${project.imagePath}`}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>

          <CardContent className="p-6 flex flex-col flex-1">
            <h3 className="text-xl mb-3">{project.title}</h3>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              {project.description.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < project.description.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex-1" />

            <div className="flex gap-3">
              {project.github && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    window.open(project.github, "_blank", "noopener,noreferrer")
                  }
                >
                  <span className="flex items-center justify-center gap-2">
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </span>
                </Button>
              )}
              {project.demo && (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    window.open(project.demo, "_blank", "noopener,noreferrer")
                  }
                >
                  <span className="flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Demo</span>
                  </span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Project;
