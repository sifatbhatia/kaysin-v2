'use client';

import { useEffect, useState } from 'react';

export default function LiveSet() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const stop = () => setLoaded(false);
    window.addEventListener('kaysin:audio-play', stop);
    return () => window.removeEventListener('kaysin:audio-play', stop);
  }, []);
  return (
    <figure className="live-set">
      <div className="film-frame">
        {loaded ? <iframe src="https://www.youtube-nocookie.com/embed/sXkGLIahuFw?autoplay=1&rel=0" title="Kaysin live from Day Trip In The Park" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> :
          <button onClick={() => { window.dispatchEvent(new Event('kaysin:video-open')); setLoaded(true); }} aria-label="Watch Kaysin live from Day Trip In The Park"><img src="/images/day-trip.jpg" width="1280" height="720" alt="Kaysin playing at Day Trip In The Park" loading="lazy" /><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z" fill="currentColor" /></svg>Watch set</span></button>}
      </div>
      <figcaption><h3>Day Trip In The Park</h3><a href="https://www.youtube.com/watch?v=sXkGLIahuFw" target="_blank" rel="noreferrer">Watch on YouTube</a></figcaption>
    </figure>
  );
}
