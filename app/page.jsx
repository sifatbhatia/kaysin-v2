import MusicExperience from './components/MusicExperience';
import LiveSet from './components/LiveSet';
import Footer from './components/Footer';

const external = { target: '_blank', rel: 'noreferrer' };
const pressKit = 'https://www.dropbox.com/scl/fi/0dcz3o8e9uhzqwfgwi22m/Kaysin-EPK-2024.pdf?rlkey=jjb3zmkyklrmj914oo5fxqqb8&st=myuwboew&dl=0';

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
        <section className="about-section about-v1 page-gutter" id="about" aria-labelledby="about-heading">
          <div className="about-heading">
            <h2 id="about-heading">About Kaysin</h2>
            <p>Los Angeles</p>
          </div>
          <div className="about-copy">
            <p className="about-intro">Kaysin is a DJ, producer and A&R for Lee Foss’ Repopulate Mars, South of Saturn and North of Neptune.</p>
            <p>He started producing and DJing while studying in Santa Barbara. Now based in Los Angeles, his own records span Repopulate Mars, Thrive, Sink or Swim and Myth of Nyx, with collaborations and remixes alongside John Summit, Wenzday, LOVRA and Mindchatter.</p>
            <p>After meeting Lee Foss while both were playing Groove Cruise, he began helping with the label. The work grew into an A&R role that runs alongside his own music and shows, from Sound in L.A. to Factory Town in Miami, EDC and Day Trip.</p>
            <a className="press-link" href={pressKit} {...external}>Press kit</a>
          </div>
          <figure className="about-photo">
            <img src="/images/hoobe.webp" width="1035" height="1035" alt="Kaysin in a black racing jacket" loading="lazy" />
          </figure>
        </section>
      </main>
      <Footer />
    </>
  );
}
