import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-gray-900 p-4 sticky top-0 z-10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-pink-accent text-2xl font-bold">Vivcy Labs</Link>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-pink-light">Home</Link></li>
          <li><Link to="/projects" className="hover:text-pink-light">Projects</Link></li>
          <li><Link to="/team" className="hover:text-pink-light">Team</Link></li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;