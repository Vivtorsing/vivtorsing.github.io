import { useState, useEffect } from 'react';

//upload schedule
//0 is sunday then 1 mon, 2 tues, 3 wed, ... 6 sat
const UPLOAD_SCHEDULE = [
  { day: 2, hour: 11, minute: 0, label: 'Tuesday @ 11:00 AM' },
  { day: 4, hour: 11, minute: 0, label: 'Thursday @ 11:00 AM' },
  { day: 6, hour: 8, minute: 0, label: 'Saturday @ 8:00 AM' },
  { day: 0, hour: 8, minute: 0, label: 'Sunday @ 8:00 AM' },
];

//find the next upload date
function getNextUpload() {
  const now = new Date();

  const candidates = UPLOAD_SCHEDULE.map(({ day, hour, minute }) => {
    const candidate = new Date(now);
    const currentDay = now.getDay();
    let daysAhead = (day - currentDay + 7) % 7;

    //if same day and passed then it is next week
    if(daysAhead === 0 && (now.getHours() > hour || (now.getHours() === hour && now.getMinutes() >= minute))) {
      daysAhead = 7;
    }

    candidate.setDate(now.getDate() + daysAhead);
    candidate.setHours(hour, minute, 0, 0);
    return candidate;
  });

  //get the earliest upload
  return candidates.reduce((earliest, c) => (c < earliest ? c : earliest));
}

//find the date
function getScheduleLabel(date) {
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const entry = UPLOAD_SCHEDULE.find(e => e.day === day && e.hour === hour && e.minute === minute);
  return entry ? entry.label : '';
}

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [label, setLabel] = useState('');

  useEffect(() => {
    function update() {
      const target = getNextUpload();
      setLabel(getScheduleLabel(target));

      const diff = target - Date.now();
      if(diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="countdown-block">
      <div>
        <div className="countdown-label">Next Upload In</div>
        <div className="countdown-units">
          <div className="countdown-unit">
            <div className="countdown-number">{pad(time.days)}</div>
            <div className="countdown-unit-label">Days</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-unit">
            <div className="countdown-number">{pad(time.hours)}</div>
            <div className="countdown-unit-label">Hours</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-unit">
            <div className="countdown-number">{pad(time.minutes)}</div>
            <div className="countdown-unit-label">Mins</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-unit">
            <div className="countdown-number">{pad(time.seconds)}</div>
            <div className="countdown-unit-label">Secs</div>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--pink-light)', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Subscribe so you don't miss it! 🔔
        </div>
        {/*small schedule list*/}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
          {UPLOAD_SCHEDULE.map((entry) => (
            <div
              key={entry.label}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                color: getScheduleLabel(getNextUpload()) === entry.label
                  ? 'var(--pink-light)'
                  : 'var(--text-muted)',
                fontWeight: getScheduleLabel(getNextUpload()) === entry.label ? 700 : 400,
              }}
            >
              {getScheduleLabel(getNextUpload()) === entry.label ? '▶ ' : '· '}{entry.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}