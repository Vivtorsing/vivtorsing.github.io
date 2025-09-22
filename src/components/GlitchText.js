import React, { useEffect, useRef, useState } from "react";

/**
 * ObfuscatedText
 * Props:
 *  - text: string (required)
 *  - speed: number (ms between updates, default 60)
 *  - obfuscationProbability: number 0-1 (chance each char is replaced on each tick; default 1)
 *  - charset: string (characters used to replace; default Minecraft-ish set)
 *  - hoverReveal: boolean (reveal original text while hovering; default true)
 *  - revealAfter: number|null (ms to automatically reveal original text after this many ms; default null)
 *  - className: string (extra classes/styles)
 */
export default function GlitchText({
  text,
  speed = 60,
  obfuscationProbability = 1,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{};:<>/?",
  hoverReveal = true,
  revealAfter = null,
  className = "",
}) {
  const original = useRef(text);
  const [display, setDisplay] = useState(text.split(""));
  const [revealed, setRevealed] = useState(false);
  const rafRef = useRef(null);
  const lastTickRef = useRef(performance.now());

  //pick a random char
  const randChar = () => charset[Math.floor(Math.random() * charset.length)];

  useEffect(() => {
    original.current = text;
    setDisplay(text.split(""));
    setRevealed(false);
  }, [text]);

  useEffect(() => {
    if(revealed) return; //stop the animation

    let mounted = true;
    const tick = () => {
      if(!mounted) return;
      const now = performance.now();
      //update after couple ms
      if(now - lastTickRef.current >= speed) {
        lastTickRef.current = now;
        setDisplay(prev => {
          const source = original.current.split("");
          const next = prev.slice();
          for(let i = 0; i < source.length; i++) {
            const ch = source[i];
            if(ch === " ") {
              next[i] = " ";
              continue;
            }
            //check if we should glitch this char
            if (Math.random() <= obfuscationProbability) {
              next[i] = randChar();
            } else {
              //sometimes reveal the char
              if(Math.random() < 0.05) next[i] = ch;
              else next[i] = randChar();
            }
          }
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      if(rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, obfuscationProbability, charset, revealed]);

  //timer reveal as well
  useEffect(() => {
    if(revealAfter == null) return;
    const id = setTimeout(() => setRevealed(true), revealAfter);
    return () => clearTimeout(id);
  }, [revealAfter]);

  //show the text
  const shown = revealed ? original.current.split("") : display;

  //hover reveal
  const handleMouseEnter = () => {
    if(hoverReveal) setRevealed(true);
  };
  const handleMouseLeave = () => {
    if(hoverReveal && revealAfter == null) setRevealed(false);
  };

  return (
    <span
      className={`obf-text inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={original.current} //screen readers can still see it
      role="text"
      style={{ fontFamily: "monospace", whiteSpace: "pre" }}
    >
      {shown.map((c, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {c}
        </span>
      ))}
    </span>
  );
}