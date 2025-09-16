import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Voucherly from './pages/Voucherly';
import Vilo from './pages/Vilo';
import Team from './pages/Team';
import TeamMember from './pages/TeamMember';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Vivtorsing from './pages/Vivtorsing';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Helmet>
        <title>Vivcy Labs</title>
        <meta name="description" content="Discover cutting-edge apps and tools from Vivcy Labs!" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/voucherly" element={<Voucherly />} />
          <Route path="/projects/vilo" element={<Vilo />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/vivtorsing" element={<Vivtorsing />} />
          <Route path="/team/:memberId" element={<TeamMember />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;