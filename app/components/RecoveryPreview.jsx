'use client';

import { useEffect, useRef, useState } from 'react';
import releases from '../releases.json';
import styles from '../not-found.module.css';

const record = releases[0];
export default function RecoveryPreview() {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => { const node = audio.current; return () => node?.pause(); }, []);
  async function toggle() {
    const node = audio.current;
    if (!node) return;
    if (!node.paused) { node.pause(); return; }
    setError(false); setLoading(true);
    try { await node.play(); } catch (failure) { if (failure.name !== 'AbortError') setError(true); } finally { setLoading(false); }
  }
  return <section className={styles.preview} aria-label="Lift Your Hands preview">
    <audio ref={audio} src={record.preview} preload="none" onPlaying={() => { setPlaying(true); setLoading(false); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setPlaying(false); setLoading(false); setError(true); }} onTimeUpdate={event => setTime(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} />
    <img src={record.art} width="800" height="800" alt="Lift Your Hands artwork" />
    <div className={styles.previewCopy}><h2>Lift Your Hands</h2><p>Kaysin + 3Beat</p><button disabled={loading} onClick={toggle}><svg viewBox="0 0 24 24" aria-hidden="true">{playing ? <path fill="currentColor" d="M7 5h4v14H7zM14 5h4v14h-4z" /> : <path fill="currentColor" d="m8 5 11 7-11 7Z" />}</svg>{loading ? 'Loading preview' : playing ? 'Pause preview' : 'Play preview'}</button></div>
    <a href={record.url} target="_blank" rel="noreferrer">Listen</a>
    {duration > 0 && <progress aria-label="Preview progress" max={duration} value={time} />}
    {error && <p className={styles.error} role="status">Preview unavailable. Use Listen to open the release.</p>}
  </section>;
}
