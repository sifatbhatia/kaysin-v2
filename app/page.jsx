import MusicExperience from './components/MusicExperience';
import LiveSet from './components/LiveSet';
import Footer from './components/Footer';

const external = { target: '_blank', rel: 'noreferrer' };

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#music">Skip to music</a>
      <main id="top" data-edition="v2">
        <MusicExperience />
        <section className="live-section page-gutter" id="live">
          <div className="section-heading"><h2>Live</h2><a href="https://soundcloud.com/kaysin" {...external}>More sets on SoundCloud</a></div>
          <div className="live-grid">
            <LiveSet />
            <div className="live-aside">
              <div><h3>Shows</h3><p>Get notified when Kaysin is playing in your city.</p><a href="https://www.bandsintown.com/a/13157343-kaysin" {...external}>Follow on Bandsintown</a></div>
              <div><h3>Kaysin’s Cuts</h3><p>His ongoing selection on Spotify.</p><a href="https://open.spotify.com/playlist/7HK3VI59KxdDZrTL5l6jJh" {...external}>Open the playlist</a></div>
            </div>
          </div>
        </section>
        <section className="about-section page-gutter" id="about">
          <div className="about-photos">
            <img className="about-candid" src="/images/candid-night.webp" width="640" height="640" alt="Kaysin outside a café at night" loading="lazy" />
            <img className="about-booth" src="/images/booth-red.webp" width="640" height="640" alt="Kaysin behind the decks in a crowded club" loading="lazy" />
          </div>
          <div className="about-copy">
            <h2>About Kaysin</h2>
            <p className="bio-lead">DJ, producer and A&R, based in Los Angeles.</p>
            <p>Kaysin started producing and DJing while studying in Santa Barbara. His own catalogue connects Repopulate Mars, South of Saturn, Thrive and Sink or Swim, with collaborations and remixes alongside 3Beat, John Summit, Wenzday, LOVRA and Mindchatter.</p>
            <p>After meeting Lee Foss on Groove Cruise, he began helping with the label. He now handles A&R across Repopulate Mars, South of Saturn and North of Neptune alongside his own music and shows.</p>
            <p>His sets have taken him from Sound in L.A. to Factory Town in Miami, EDC and Day Trip.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
