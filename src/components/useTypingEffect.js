import { useState, useEffect, useRef } from 'react';

const ROLES = [
  'a Minecraft YouTuber',
  'a Command Block Engineer',
  'a Okay Builder',
  'a Computer Scientist',
  'a Developer',
  'a Server Admin'
];

export function useTypingEffect() {
  const [displayText, setDisplayText] = useState('');
  const stateRef = useRef({ roleIndex: 0, charIndex: 0, phase: 'typing' });
  const timeoutRef = useRef(null);

  useEffect(() => {
    function tick() {
      const { roleIndex, charIndex, phase } = stateRef.current;
      const current = ROLES[roleIndex];

      if(phase === 'typing') {
        if(charIndex <= current.length) {
          setDisplayText(current.slice(0, charIndex));
          stateRef.current.charIndex = charIndex + 1;
          timeoutRef.current = setTimeout(tick, 55 + Math.random() * 45);
        } else {
          stateRef.current.phase = 'waiting';
          timeoutRef.current = setTimeout(tick, 2200);
        }
      } else if(phase === 'waiting') {
        stateRef.current.phase = 'deleting';
        timeoutRef.current = setTimeout(tick, 400);
      } else if(phase === 'deleting') {
        if(charIndex > 0) {
          stateRef.current.charIndex = charIndex - 1;
          setDisplayText(current.slice(0, charIndex - 1));
          timeoutRef.current = setTimeout(tick, 30);
        } else {
          stateRef.current.roleIndex = (roleIndex + 1) % ROLES.length;
          stateRef.current.charIndex = 0;
          stateRef.current.phase = 'typing';
          timeoutRef.current = setTimeout(tick, 150);
        }
      }
    }

    timeoutRef.current = setTimeout(tick, 400);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return displayText;
}