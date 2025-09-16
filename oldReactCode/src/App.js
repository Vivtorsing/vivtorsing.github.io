import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AnimatedBackground } from 'animated-backgrounds';
import YouTubeSection from "./YouTubeSection";
import ProjectsSection from "./ProjectsSection";
import Footer from "./Footer";
import "./styles.css";

import vivtorsingImage from "./images/vivtorsinglogo.jpg";

const phrases = [
  "YouTuber",
  "Computer Scientist",
  "Minecrafter",
  "Software Engineer",
  "Command Block Engineer",
  "Web Developer"
];

const App = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const youtubeChannelName = "Vivtorsing";

  return (
    <div className="app dark-mode">
      <AnimatedBackground animationName="cosmicDust" blendMode="normal" />
      <header className="hero">
        {/*top of page with logo and name*/}
        <div className="youtube-header">
          <motion.img
            src={vivtorsingImage}
            alt={youtubeChannelName}
            className="youtube-image floating-image"
            animate={{ y: [0, -5, 0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="youtube-channel-name rainbow-text">{youtubeChannelName}</span>
        </div>

        {/*phrases part*/}
        <h1>
          I am a{" "}
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            {phrases[index]}
          </motion.span>
        </h1>

        {/*social media buttons*/}
        <div className="social-buttons">
          <a href="https://www.youtube.com/@Vivtorsing" target="_blank" rel="noopener noreferrer" className="social-button youtube">
            <FaYoutube />
          </a>
          <a href="https://discord.gg/d62FebH" target="_blank" rel="noopener noreferrer" className="social-button discord">
            <FaDiscord />
          </a>
          <a href="https://twitter.com/vivtorsing" target="_blank" rel="noopener noreferrer" className="social-button twitter">
            <FaXTwitter />
          </a>
        </div>
      </header>

      <YouTubeSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
};

export default App;


{/*background*/}
      //<div className="absolute inset-0 -z-10">
        //<AnimatedBackground animationName="auroraBorealis" blendMode="normal" />
      //</div>