import { useMemo } from 'react';

export default function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      dur: (Math.random() * 3 + 2).toFixed(1),
      delay: (Math.random() * 4).toFixed(1),
    }));
  }, []);

  //sparkle orbs
  const orbs = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: Math.random() > 0.5 ? 'rgba(255,157,232,0.6)' : 'rgba(125,212,252,0.5)',
      dur: (Math.random() * 4 + 3).toFixed(1),
      delay: (Math.random() * 5).toFixed(1),
    }));
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          }}
        />
      ))}
      {orbs.map(o => (
        <div
          key={`orb-${o.id}`}
          className="star"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: `${o.size}px`,
            height: `${o.size}px`,
            background: o.color,
            boxShadow: `0 0 ${o.size * 3}px ${o.color}`,
            '--dur': `${o.dur}s`,
            '--delay': `${o.delay}s`,
          }}
        />
      ))}
    </div>
  );
}