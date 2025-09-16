import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import ViloIcon from '../images/Vilo/ViloIcon.png';
import Boards from '../images/Vilo/boards.png';
import Checklist from '../images/Vilo/checklist.png';
import Sections from '../images/Vilo/sections.png';

//images
const logoSrc = ViloIcon; //logo
const featureImages = {
  boards: Boards,
  sections: Sections,
  tasks: Checklist,
};

const Vilo = () => {
  //animation
  const logoVariants = {
    animate: {
      y: [0, -10, 0], //go up and down
      rotate: [0, 5, -5, 0], //some rotation
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Vilo - Vivcy Labs</title>
        <meta name="description" content="Vilo: A simple desktop app for tracking tasks and progress offline. Built with Electron for easy organization." />
      </Helmet>
      <div className="max-w-4xl mx-auto py-12">
        {/*top section*/}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <motion.img
            src={logoSrc}
            alt="Taskly Logo"
            className="w-48 h-48 mx-auto mb-4 shadow-pink-dark"
            variants={logoVariants}
            animate="animate"
          />
          <h1 className="text-4xl font-bold text-pink-accent cute-title">Vilo</h1>
        </motion.section>

        {/*tagline and desc*/}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-pink-light mb-4">A Simple Desktop App for Task Management</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Vilo is a simple desktop app that I created just to learn Electron and definitely not because I was too lazy to sign back into to Trello... Anyways a simple place to keep track of your tasks and progress offline!
          </p>
        </section>

        {/*features section*/}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pink-accent mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card flex flex-col items-center"
            >
              <img src={featureImages.boards} alt="Boards" className="w-full h-full mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Boards</h3>
              <p>Create as many boards as you want to categorize your tasks.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card flex flex-col items-center"
            >
              <img src={featureImages.sections} alt="Sections" className="w-full h-full mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Sections</h3>
              <p>Inside each board, group your tasks with collapsible sections like "To Do", "In Progress", or "Done".</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card flex flex-col items-center"
            >
              <img src={featureImages.tasks} alt="Tasks with Checklists" className="w-full h-full mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Tasks with Checklists</h3>
              <p>Tasks can include detailed descriptions and interactive checklists with progress bars.</p>
            </motion.div>
            </div>
            </section>
            <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card flex flex-col items-center"
            >
             
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Drag & Drop</h3>
              <p>Easily rearrange tasks and sections with smooth drag-and-drop functionality.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card flex flex-col items-center"
            >
              
              <h3 className="text-xl font-semibold mb-2 text-pink-light">UI</h3>
              <p>Clean design with dark mode.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card flex flex-col items-center"
            >
          
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Auto-Save</h3>
              <p>Your data is saved locally and automatically. No internet required.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card flex flex-col items-center"
            >
           
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Overlay Task Viewer</h3>
              <p>Click a task to open a pop-up with its full description and checklist.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card flex flex-col items-center"
            >
             
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Checklist Progress</h3>
              <p>Visual progress bars track how far along you are in each task.</p>
            </motion.div>
          </div>
        </section>

        {/*link button*/}
        <div className="text-center">
          <a href="https://github.com/Vivtorsing/Vilo" className="btn-pink text-lg px-8 py-3" target="_blank" rel="noopener noreferrer">Get Vilo Now</a>
        </div>
      </div>
    </>
  );
};

export default Vilo;