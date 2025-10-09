import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import UselessBotLogo from '../images/UselessBotLogo.png';
import ViloIcon from '../images/Vilo/ViloIcon.png'
import VoucherlyIcon from '../images/Voucherly/VoucherlyIcon.png';
import VivieIcon from '../images/VivieAILogo.png';
import mcCommandsIcon from '../images/mcCommandsLogo.png';
import AIToolsLogo from '../images/AIToolsLogo.png';

//all the projects here
const featuredProjects = [
  { id: 'uselessbot', title: 'Useless Bot', description: 'A fun Discord Bot.', image: UselessBotLogo, externalLink: 'http://vivtorsing.com/UselessBot/' },
  { id: 'voucherly', title: 'Voucherly', description: 'Create and manage invoices easily.', image: VoucherlyIcon, link: '/projects/voucherly' },
  { id: 'vilo', title: 'Vilo', description: 'Organize tasks with ease.', image: ViloIcon, link: '/projects/vilo' },
  { id: 'vivie', title: 'Vivie AI', description: 'A Minecraft AI', image: VivieIcon, externalLink: 'https://vivtorsing.com/Vivie/'},
  { id: 'mccommands', title: 'mcCommands', description: 'Browse and explore useful Minecraft commands', image: mcCommandsIcon, externalLink: 'https://vivtorsing.com/mcCommands/'},
  { id: 'aitools', title: 'AITools', description: 'Explore AI-powered tools right in your browser', image: AIToolsLogo, externalLink: 'https://vivtorsing.com/AITools/'}
];

const Home = () => {
  //animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Helmet>
        <title>Vivcy Labs</title>
        <meta name="description" content="Welcome to Vivcy Labs, where we build whatever software we want and strive for the future!" />
      </Helmet>
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center py-12"
      >
        <h1 className="cute-title mb-4">Vivcy Labs</h1>
        <p className="text-xl text-pink-light max-w-2xl mx-auto mb-8">
          Vivcy Labs is the place where we build whatever software we want and do whatever we want and strive for the future!
        </p>
        <Link to="/projects" className="btn-pink">Explore Our Projects</Link>
      </motion.section>

      {/*project section*/}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-pink-accent mb-8 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
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
      </section>

      {/*cta section*/}
      <section className="text-center py-12 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-bold text-pink-accent mb-4">Join the Future</h2>
        <p className="mb-6">Want to collaborate or learn more? Get in touch!</p>
        {/*<Link to="/contact" className="btn-pink mr-4">Contact Us</Link>*/}
        <Link to="/team" className="btn-pink">Meet the Team</Link>
      </section>
    </>
  );
};

export default Home;