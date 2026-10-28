'use client';

import { useEffect, useRef, useState } from 'react';
import releases from '../releases.json';
import Navigation from './Navigation';

const external = { target: '_blank', rel: 'noreferrer' };
const title = record => record.title.split(' feat. ')[0].replace(' (John Summit & Kaysin Remix)', '');
const credits = record => `${record.artist}${record.title.includes(' feat. ') ? ` feat. ${record.title.split(' feat. ')[1]}` : ''}`;
const clock = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

function PlayIcon({ playing }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{playing ? <path fill="currentColor" d="M7 5h4v14H7zM14 5h4v14h-4z" /> : <path fill="currentColor" d="m8 5 11 7-11 7Z" />}</svg>;
}

export default function MusicExperience() {
  const audio = useRef(null);
  const generation = useRef(0);
  const chosen = useRef(0);
  const source = useRef('');
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const track = releases[index];

  useEffect(() => {
    const pause = () => {
      generation.current += 1;
      audio.current?.pause();
      setPhase(previous => previous === 'idle' ? 'idle' : 'paused');
    };
    window.addEventListener('kaysin:video-open', pause);
    return () => { window.removeEventListener('kaysin:video-open', pause); audio.current?.pause(); };
  }, []);

  async function play(next) {
    const node = audio.current;
    if (!node) return;
    if (chosen.current === next && !node.paused) {
      generation.current += 1;
      node.pause();
      setPhase('paused');
      return;
    }
    const attempt = ++generation.current;
    chosen.current = next;
    setIndex(next);
    setError('');
    if (source.current !== releases[next].preview) {
      node.pause();
      source.current = releases[next].preview;
      node.src = source.current;
      setTime(0);
      setDuration(0);
      node.load();
    }
    window.dispatchEvent(new Event('kaysin:audio-play'));
    setPhase('loading');
    try {
      await node.play();
      if (attempt === generation.current) setPhase('playing');
    } catch (failure) {
      if (attempt !== generation.current || failure.name === 'AbortError') return;
      setPhase('error');
      setError('The preview could not be loaded. Open the full release on Apple Music.');
    }
  }

  const isPlaying = i => i === index && phase === 'playing';
  const action = i => i === index && phase === 'loading' ? 'Loading preview' : isPlaying(i) ? 'Pause preview' : 'Play preview';

  return (
    <>
      <audio ref={audio} preload="none" onTimeUpdate={event => setTime(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} onEnded={() => setPhase('paused')} onPause={() => setPhase(previous => previous === 'idle' ? 'idle' : 'paused')} onWaiting={() => setPhase(previous => previous === 'idle' ? 'idle' : 'loading')} onError={() => { if (source.current) { setPhase('error'); setError('Preview unavailable. Open the full release on Apple Music.'); } }} onPlaying={() => setPhase('playing')} />
      <section className="night-hero" aria-label="Kaysin">
        <Navigation />
        <div className="hero-content page-gutter">
          <h1><span className="sr-only">Kaysin</span><img className="hero-logo" src="/images/wordmark-white.svg" width="666" height="102" alt="" fetchPriority="high" /></h1>
          <div className="hero-photo">
            <picture><source media="(max-width: 700px)" srcSet="/images/booth-hands.webp" /><img src="/images/squarespace-club.webp" width="2048" height="1365" alt="Kaysin performing in a crowded club" fetchPriority="high" /></picture>
          </div>
          <div className="hero-release">
            <img src={releases[0].art} width="800" height="800" alt="Lift Your Hands artwork" />
            <div><p>Kaysin + 3Beat</p><h2>Lift Your Hands</h2></div>
            <p className="hero-label">South of Saturn</p>
            <button className="play-button" onClick={() => play(0)}><PlayIcon playing={isPlaying(0)} /><span>{action(0)}</span></button>
            <a className="hero-listen" href="https://orcd.co/sos129" {...external}>Listen / download</a>
          </div>
        </div>
      </section>

      <section className="music-section page-gutter" id="music">
        <div className="section-heading"><h2>Music</h2><div><a href="https://open.spotify.com/artist/10mZhaOPNKtQfg46DptrBU" {...external}>Spotify</a><a href="https://www.beatport.com/artist/kaysin/641789" {...external}>Beatport</a></div></div>
        <div className="featured-records">
          {releases.slice(0, 2).map((record, i) => (
            <article className="record" key={record.title}>
              <button className="record-art" onClick={() => play(i)} aria-label={`${action(i)}: ${record.title}`}><img src={record.art} width="800" height="800" alt={`${record.title} artwork`} loading="lazy" /></button>
              <div className="record-description"><div><h3>{title(record)}</h3><p>{record.artist} <span>· {record.year}</span></p><small>{record.label}</small></div><button className="record-play" aria-label={`${action(i)}: ${record.title}`} onClick={() => play(i)}><PlayIcon playing={isPlaying(i)} /></button><a href={i === 0 ? 'https://orcd.co/sos129' : 'https://orcd.co/rpm268'} {...external}>Listen</a></div>
            </article>
          ))}
        </div>
        <details className="catalogue" open>
          <summary>More releases</summary>
          <div>{releases.slice(2).map((record, i) => <div className="catalogue-row" key={record.title}><button onClick={() => play(i + 2)} aria-label={`${action(i + 2)}: ${record.title}`}><img src={record.art} width="800" height="800" alt="" loading="lazy" /><span><strong>{title(record)}</strong><small>{record.title.includes('Remix') ? 'Will Taylor (UK) · John Summit + Kaysin remix' : credits(record)}</small></span><PlayIcon playing={isPlaying(i + 2)} /></button><span className="catalogue-label">{record.label}</span><time dateTime={record.date}>{record.year}</time><a href={record.url} {...external}>Listen</a></div>)}</div>
        </details>
      </section>

      {phase !== 'idle' && <aside className="audio-player" aria-label="Preview controls"><button onClick={() => play(index)} aria-label={phase === 'playing' ? 'Pause preview' : 'Resume preview'}><PlayIcon playing={phase === 'playing'} /></button><div className="player-track"><strong>{title(track)}</strong><span>{phase === 'loading' ? 'Loading preview' : track.artist}</span></div><input type="range" aria-label="Preview position" min="0" max={duration || 1} step="0.1" value={Math.min(time, duration || 1)} disabled={!duration} onChange={event => { if (audio.current && duration) { audio.current.currentTime = Number(event.target.value); setTime(Number(event.target.value)); } }} /><span className="player-clock">{clock(time)}{duration ? ` / ${clock(duration)}` : ''}</span><a href={track.url} {...external}>Full release</a><button className="player-close" aria-label="Stop preview and close controls" onClick={() => { generation.current += 1; audio.current?.pause(); setPhase('idle'); }}>×</button>{error && <p role="status">{error}</p>}</aside>}
    </>
  );
}
