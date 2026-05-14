import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import { FaYoutube, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { Canvas, useFrame } from '@react-three/fiber'
import { Center } from '@react-three/drei';
import MinecraftModel from '../components/MinecraftModel';
import Starfield from '../components/Starfield';
import Countdown from '../components/Countdown';
import { useTypingEffect } from '../components/useTypingEffect';
import '../styles/Vivtorsing.css'

//video schedule
const SCHEDULE = [
  { day: 'Mon', icon: '📜', type: 'Planning' },
  { day: 'Tue', icon: '📹', type: 'Shorts', active: true },
  { day: 'Wed', icon: '🎮', type: 'Minecraft' },
  { day: 'Thu', icon: '📹', type: 'Shorts', active: true },
  { day: 'Fri', icon: '🖥️', type: 'Editing' },
  { day: 'Sat', icon: '🎥', type: 'Snapshot or Cool Video', active: true },
  { day: 'Sun', icon: '🎥', type: 'Command Block Video', active: true },
];

//all the projects
const PROJECTS = [
  { emoji: '🤖', name: 'Useless Bot', desc: 'A Discord Bot that might sound useless but it is actually kinda useful!', status: 'ongoing', link: 'https://vivtorsing.com/UselessBot' },
  { emoji: '🌸', name: 'Vivie AI', desc: 'A little AI that can play Minecraft and more!', status: 'upcoming', link: 'https://vivtorsing.com/Vivie' },
  { emoji: '⚙️', name: 'mcCommands', desc: 'A place to view all my commands and easily add them to your world with a single command!', status: 'complete', link: 'https://vivtorsing.com/mcCommands' },
];

//lenis scroll
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Vivtorsing() {
  const [scrollPhase, setScrollPhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorNormRef = useRef({ x: 0, y: 0 });
  const [cursorNorm, setCursorNorm] = useState({ x: 0, y: 0 });
  const [showScrollHint, setShowScrollHint] = useState(false);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const typingText = useTypingEffect();

  const [animation, setAnimation] = useState("idle");
  const [secretAnimation, setSecretAnimation] = useState(null);
  const elementsRef = useRef([]);
  const canvasWrapperRef = useRef();

  useReveal();

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
            let videoId = url.searchParams.get('v');
            //if null then it might be a short
            if(videoId == null) {
              let urlParts = url.pathname.split('/');
              videoId = urlParts[urlParts.indexOf('shorts') + 1]
            }
            return { id: videoId, title: item.title, link: url };
          });
          setLatestVideos(videos);
        }
      } catch(error) {
        console.error("Failed to fetch YouTube videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    elements.forEach(el => {
      el.classList.add('visible');
    });
  }, [latestVideos]);

  //lenis scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });

    lenis.on('scroll', ({ scroll, limit }) => {
      const prog = scroll / Math.max(limit, 1);
      setScrollProgress(prog);

      const vh = window.innerHeight;
      if(scroll < vh * 0.6) setScrollPhase(0);
      else if(scroll < vh * 1.6) setScrollPhase(1);
      else setScrollPhase(2);
    });

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    const rafId = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(rafId); };
  }, []);

  //custom cursor
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if(cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }
      if(cursorRingRef.current) {
        cursorRingRef.current.style.left = x + 'px';
        cursorRingRef.current.style.top = y + 'px';
      }

      const rect = canvasWrapperRef.current?.getBoundingClientRect();

      if(rect) {
        const cx = (x - rect.left) / rect.width;
        const cy = (y - rect.top) / rect.height;

        const nx = cx * 2 - 1;
        const ny = cy * 2 - 1;

        cursorNormRef.current = { x: nx, y: ny };
        setCursorNorm({ x: nx, y: ny });
      }
    }

    const hoverIn = () => cursorRef.current?.classList.add('hover');
    const hoverOut = () => cursorRef.current?.classList.remove('hover');

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, .video-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', hoverIn);
      el.addEventListener('mouseleave', hoverOut);
    });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  //current location on page
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: .6,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          const newLocation = entry.target.getAttribute('data-location');
          setAnimation(newLocation);
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    elementsRef.current.forEach((el) => {
      if(el) observer.observe(el);
    })

    return () => observer.disconnect();
  }, [])

  return (
    <div className="app-wrapper app-cursor">
      <Helmet>
        <title>Vivtorsing</title>
        <meta name="description" content="A weird Minecraft YouTuber that loves command blocks and Minecraft!" />
      </Helmet>
      {/*cursor*/}
      <div ref={cursorRef} className="cursor" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/*background*/}
      <div className="noise-overlay" />
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <Starfield />

      {/*minecraft model*/}
      <div ref={canvasWrapperRef} className="model-canvas-wrapper" style={{width: '38%'}}>
        <Canvas camera={{ fov: 35 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} />
          <Center>
            <MinecraftModel animation={animation} secretAnimation={secretAnimation} setSecretAnimation={setSecretAnimation} cursorNorm={cursorNorm} />
          </Center>
        </Canvas>
      </div>

      {/*page sections*/}
      <div className="sections-container">

        {/*name with typing effect*/}
        <div className="intro-transition"
          ref={(el) => (elementsRef.current.push(el))}
          data-location={"wave"}
        >
          <div className="intro-text-block">
            <div className="intro-name">Vivtorsing</div>
            <div className="intro-subtitle">
              A weird Minecraft YouTuber<br />
              That loves command blocks and Minecraft!
            </div>
            <div className="typing-line">
              <span className="typing-prefix">I'm&nbsp;</span>
              <span className="typing-text">{typingText}</span>
              <span className="typing-cursor" />
            </div>
          </div>
        </div>

        <div className="glow-divider" />

        {/*latest videos*/}
        <section className="content-section reveal">
          <div className="section-tag"
            ref={(el) => (elementsRef.current.push(el))}
            data-location={"idle"}>Latest Videos</div>
          <h2 className="section-title">Fresh Videos 🎬</h2>
          <p className="section-description">
            New videos every Saturday and Sunday! Subscribe and hit the bell so you never miss an upload.
          </p>
          <div className="videos-grid">
            {latestVideos.map((v, i) => (
              <a
                key={i}
                className="video-card reveal"
                href={v.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                {i === 0 && <div className="video-badge">✨ Latest</div>}
                <div className="video-thumbnail-placeholder">
                  <img
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                    alt={v.title}
                  />

                </div>
                <div className="video-info">
                  <div className="video-title">{v.title}</div>
                </div>
              </a>
            ))}

          </div>
        </section>

        <div className="glow-divider" />

        {/*schedule*/}
        <section className="content-section reveal"
          ref={(el) => (elementsRef.current.push(el))}
          data-location={"idle"}
        >
          <div className="section-tag">Upload Schedule</div>
          <h2 className="section-title">When to Tune In 📅</h2>
          <p className="section-description">
            Here's when you can expect new content from me each week!
          </p>
          <div className="schedule-grid reveal">
            {SCHEDULE.map((d, i) => (
              <div key={d.day} className={`day-card reveal reveal-delay-${(i % 4) + 1} ${d.active ? 'active' : ''}`}>
                <div className="day-name">{d.day}</div>
                <div className="day-icon">{d.icon}</div>
                <div className="day-type">{d.type}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Countdown />
          </div>
        </section>

        <div className="glow-divider" />

        {/*projects*/}
        <section className="content-section full-width reveal">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>Projects</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>What I'm Building ⚒️</h2>
            <p className="section-description" style={{ margin: '0 auto', textAlign: 'center' }}>
              From command block contraptions to coding — here's everything I'm working on!
            </p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <a
                key={p.name}
                className={`project-card reveal reveal-delay-${(i % 4) + 1}`}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <span className="project-emoji">{p.emoji}</span>
                <div className="project-name">{p.name}</div>
                <p className="project-desc">{p.desc}</p>
                <span className={`project-status ${p.status}`}>
                  {p.status === 'ongoing' ? '🔨 In Progress' : p.status === 'complete' ? '✅ Complete' : '🌟 Coming Soon'}
                </span>
              </a>
            ))}
          </div>
        </section>

        <div className="glow-divider" />

        {/*about me section*/}
        <section className="content-section full-width reveal">
          <div className="section-tag">About Me</div>
          <h2 className="section-title">A Little About Me 🌸</h2>
          <div className="about-grid">
            <div className="about-text reveal">
              <p>Hey! I'm <strong>Vivtorsing</strong> — a Minecraft YouTuber who's been playing for over 10+ years! What started as a fun game playing with friends now turned into a full-blown passion for command blocks, and sharing it all with the most amazing community!</p>
              <p>I do way too much <strong>command block engineering</strong> — creating cool things inside Vanilla Minecraft without mods. Think life improvements, random stuff, mini-games, and more — all from a command block!</p>
            </div>
            <div className="fun-facts reveal reveal-delay-2">
              <div className="fun-facts-title">✨ Fun Facts</div>
              {[
                { emoji: '🎮', label: 'Favorite Mini Game Created', fact: 'Top Golf' },
                { emoji: '🌸', label: 'Favorite Wood Type', fact: 'Oak wood or Cherry wood!' },
                { emoji: '🍪', label: 'Favorite Food', fact: 'The Cookie Monster fears me...' },
                { emoji: '🔍', label: 'LORE???', fact: 'What?! There is no lore on the channel...' },
              ].map(f => (
                <div key={f.label} className="fact-item">
                  <div className="fact-emoji">{f.emoji}</div>
                  <div className="fact-content"><strong>{f.label}</strong>{f.fact}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="glow-divider" />

        {/*social links*/}
        <section className="content-section full-width social-section reveal">
          <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>Find Me Everywhere</div>
          <h2 className="social-title">Let's Be Friends! ♥️</h2>
          <p className="social-subtitle">Come hang out across all my platforms ✨ (Even if I barely post elsewhere...)</p>
          <div className="social-links">
            <a href="https://www.youtube.com/@Vivtorsing" target="_blank" rel="noopener noreferrer" className="social-link youtube"><FaYoutube /> YouTube</a>
            <a href="https://discord.gg/d62FebH" target="_blank" rel="noopener noreferrer" className="social-link discord"><FaDiscord /> Discord</a>
            <a href="https://twitter.com/vivtorsing" target="_blank" rel="noopener noreferrer" className="social-link twitter"><FaXTwitter /> Twitter / X</a>
          </div>
        </section>
      </div>
    </div>
  );
}