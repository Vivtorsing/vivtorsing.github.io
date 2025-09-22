import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaYoutube, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { ReactTyped } from 'react-typed';
import Galaxy from '../components/Galaxy';
import SkinViewer from '../components/SkinViewer';
import GlitchText from '../components/GlitchText';

import VivtorsingMCSkin from '../images/VivtorsingPage/vivtorsingMCSkin.png';
import VivtorsingImage from '../images/MemberImage/vivtorsing.jpg';
import UselessBotLogo from '../images/UselessBotLogo.png';
import VivieAILogo from '../images/VivieAILogo.png';

const Youtuber = () => {

  const roles = [
    "YouTuber",
    "Computer Scientist",
    "Minecrafter",
    "Software Engineer",
    "Command Block Engineer",
    "Web Developer"
  ];
  const CHANNEL_ID = "UCECUOW5LUwZWpWTGaKUFWXg";
  const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  const [latestVideos, setLatestVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`);
        const data = await response.json();
        if(data.items) {
          const videos = data.items.slice(0, 5).map(item => {
            const url = new URL(item.link);
            const videoId = url.searchParams.get('v');
            return { id: videoId, title: item.title };
          });
          setLatestVideos(videos);
        }
      } catch (error) {
        console.error("Failed to fetch YouTube videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const projects = [
    {
      title: "Useless Bot",
      link: "https://vivtorsing.com/UselessBot",
      image: UselessBotLogo,
      description: "A Discord Bot that might sound useless but it is actually kinda useful!",
    },
    {
      title: "Vivie AI",
      link: "https://vivtorsing.com/Vivie",
      image: VivieAILogo,
      description: "A little AI that can play Minecraft and more!",
    },
  ];

  return (
    <div className="relative min-h-screen text-gray-200 overflow-hidden">
      <Helmet>
        <title>Vivtorsing</title>
        <meta name="description" content={`A weird Minecraft YouTuber that loves command blocks and Minecraft!`} />
      </Helmet>
      {/*background*/}
      <Galaxy
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        hueShift={140}
        density={1}
        glowIntensity={0.5}
        saturation={1}
        twinkleIntensity={0.5}
        mouseRepulsion={false}
        repulsionStrength={1.5}
        rotationSpeed={0.05}
        transparent={true}
      />
      <div className="relative z-10">

        {/*main section*/}
        <section className="flex flex-col items-center justify-center min-h-screen p-8">
          <img
            src={VivtorsingImage}
            alt="Logo"
            className="w-64 h-64 rounded-full animate-bounce mb-4 shadow-lg shadow-pink-500/50"
          />
          <h1 className="text-5xl font-bold text-pink-400 animate-pulse">
            Vivtorsing
          </h1>
          <p className="text-xl mt-4 text-center max-w-md">
            A weird Minecraft YouTuber that loves command blocks and Minecraft!
          </p>
          <div className="mt-6 text-2xl">
            I am a{' '}
            <ReactTyped
              strings={roles}
              typeSpeed={40}
              backSpeed={50}
              loop
              className="text-blue-400"
            />
          </div>
          <div className="flex space-x-6 mt-8">
            <a href="https://www.youtube.com/@Vivtorsing" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-4xl text-red-500 hover:text-red-400" />
            </a>
            <a href="https://discord.gg/d62FebH" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="text-4xl text-indigo-500 hover:text-indigo-400" />
            </a>
            <a href="https://twitter.com/vivtorsing" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="text-4xl text-blue-400 hover:text-blue-300" />
            </a>
          </div>
        </section>

        {/*videos sections*/}
        <section className="py-16 bg-gray-800/50 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-center mb-8 text-pink-400">Latest Videos</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {latestVideos.map((video) => (
              <div key={video.id} className="w-80">
                <iframe
                  width="320"
                  height="180"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="text-center mt-2">{video.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/*3d minecraft skin*/}
        <section className="py-16 flex justify-center">
          <div className="w-64 h-64">
            <SkinViewer
              skinUrl={VivtorsingMCSkin}
              height={256}
              width={256}
              className="animate-spin-slow"
              autoRotate={true}
            />
          </div>
        </section>

        {/*project section*/}
        <section className="py-16 bg-gray-800/50 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-center mb-8 text-blue-400">Projects</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {projects.map((project, index) => (
              <div key={index} className="w-80 bg-gray-700 p-4 rounded-lg shadow-md shadow-pink-500/50">
                <img src={project.image} alt="Project" className="w-full h-64 object-cover rounded" />
                <p className="text-2xl text-center font-bold mt-4 text-pink-400">{project.title}</p>
                <p className="mt-4">{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-400 hover:underline">
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </section>

        {/*fun fact section for fun*/}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-8 text-pink-400">Fun Facts About Me</h2>
          <ul className="list-disc max-w-2xl mx-auto pl-8">
            <li className="mb-2">I am a <GlitchText text="cmnd" hoverReveal={false} /></li>
            <li className="mb-2">I love <GlitchText text="cookies" hoverReveal={true} /></li>
            <li className="mb-2">There is no lore here...</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Youtuber;