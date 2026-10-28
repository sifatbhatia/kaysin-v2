import styles from './Footer.module.css';

export default function Footer() {
  return <footer className={styles.footer} id="contact">
    <div className={styles.contacts}>
      <div className={styles.heading}><h2>Contact</h2><span>Los Angeles, California</span></div>
      <div className={styles.row}><h3>Bookings</h3><a href="mailto:kienan@executivehouseagency.com">kienan@executivehouseagency.com</a></div>
      <div className={styles.row}><h3>Management</h3><a href="mailto:Kaysin@laffairemusicale.com">kaysin@laffairemusicale.com</a></div>
    </div>
    <div className={styles.base}>
      <a className={styles.brand} href="#top" aria-label="Kaysin, back to top"><img src="/images/wordmark-white.svg" width="666" height="102" alt="Kaysin" /></a>
      <nav aria-label="Social links"><a href="https://www.instagram.com/kaysin/" target="_blank" rel="noreferrer">Instagram</a><a href="https://soundcloud.com/kaysin" target="_blank" rel="noreferrer">SoundCloud</a><a href="https://open.spotify.com/artist/10mZhaOPNKtQfg46DptrBU" target="_blank" rel="noreferrer">Spotify</a></nav>
      <a className={styles.top} href="#top">Back to top</a>
    </div>
  </footer>;
}
