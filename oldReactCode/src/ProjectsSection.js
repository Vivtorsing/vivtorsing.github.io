import React from "react";
import { motion } from "framer-motion";
import uselessbotImage from "./images/uselessbot.png";
import vivieaiImage from "./images/vivieailogo.png";

const projects = [
  {
    title: "Useless Bot",
    url: "https://vivtorsing.com/UselessBot",
    image: uselessbotImage,
    description: "A Discord Bot that might sound useless but it is actually kinda useful!",
  },
  {
    title: "Vivie AI",
    url: "https://vivtorsing.com/Vivie",
    image: vivieaiImage,
    description: "A little AI that can play Minecraft and more!",
  },
];

const ProjectsSection = () => {
  return (
    <section className="projects-section">
      {/*title*/}
      <motion.h2
        className="cute-title"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        🌸✨ My Projects ✨🌸
      </motion.h2>

      <div className="project-grid">
        {projects.map((project, index) => (
          <a key={index} href={project.url} className="project-card" target="_blank" rel="noopener noreferrer">
            <h3>{project.title}</h3>
            <img src={project.image} alt={project.title} className="project-image" />
            <p>{project.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;