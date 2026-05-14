const Footer = () => {
  return (
    <footer className="bg-gray-900 p-4 text-center z-40">
      <p>&copy; {new Date().getFullYear()} Vivcy Labs. All rights reserved. | <a href="https://github.com/Vivtorsing" className="text-pink-accent">GitHub</a></p>
    </footer>
  );
};

export default Footer;