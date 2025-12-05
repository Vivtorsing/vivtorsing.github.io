import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import UselessBotLogo from '../images/UselessBotLogo.png';
import ViloIcon from '../images/Vilo/ViloIcon.png'
import VoucherlyIcon from '../images/Voucherly/VoucherlyIcon.png';
import VivieIcon from '../images/VivieAILogo.png';
import mcCommandsIcon from '../images/mcCommandsLogo.png';
import AIToolsLogo from '../images/AIToolsLogo.png';
import VivtorCraftLogo from '../images/VivtorCraftLogo.png';

//projects
const projects = [
  { id: 'uselessbot', title: 'Useless Bot', description: 'A fun Discord Bot.', image: UselessBotLogo, externalLink: 'http://vivtorsing.com/UselessBot/' },
  { id: 'voucherly', title: 'Voucherly', description: 'Create and manage invoices easily.', image: VoucherlyIcon, link: '/projects/voucherly' },
  { id: 'vilo', title: 'Vilo', description: 'Organize tasks with ease.', image: ViloIcon, link: '/projects/vilo' },
  { id: 'vivie', title: 'Vivie AI', description: 'A Minecraft AI', image: VivieIcon, externalLink: 'https://vivtorsing.com/Vivie/'},
  { id: 'mccommands', title: 'mcCommands', description: 'Browse and explore useful Minecraft commands', image: mcCommandsIcon, externalLink: 'https://vivtorsing.com/mcCommands/'},
  { id: 'aitools', title: 'AITools', description: 'Explore AI-powered tools right in your browser', image: AIToolsLogo, externalLink: 'https://vivtorsing.com/AITools/'},
  { id: 'vivtorcraft', title: 'VivtorCraft', description: 'A Cool Minecraft Server', image: VivtorCraftLogo, externalLink: 'https://vivtorsing.com/VivtorCraftServer/'}
];

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projects - Vivcy Labs</title>
        <meta name="description" content="Explore our projects that we have created!" />
      </Helmet>
      <h1 className="text-3xl font-bold text-pink-accent mb-8">Our Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="card"
          >
            <img src={project.image} alt={project.title} className="rounded-xl mb-4" />
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p>{project.description}</p>
            {project.link ? (
              <Link to={project.link} className="btn-pink mt-4 inline-block">Learn More</Link>
            ) : (
              <a href={project.externalLink} className="btn-pink mt-4 inline-block" target="_blank" rel="noopener noreferrer">View</a>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Projects;