import RecoveryPreview from './components/RecoveryPreview';
import styles from './not-found.module.css';

export default function NotFound() {
  return <div className={styles.page}>
    <header className={styles.header}><a className={styles.brand} href="/" aria-label="Kaysin home"><img src="/images/wordmark-white.svg" width="666" height="102" alt="Kaysin" /></a><nav aria-label="Recovery navigation"><a href="/">Home</a><a href="/#music">Music</a></nav></header>
    <main className={styles.main}>
      <figure className={styles.photo}><img src="/images/booth-hands.webp" width="640" height="640" alt="Kaysin raising his hands behind the decks" /><span aria-hidden="true">404</span></figure>
      <div className={styles.copy}><span className={styles.code}>404 · Page not found</span><h1>Wrong room</h1><p>There’s no page at this address.<br />Come back to the music.</p><div className={styles.actions}><a className={styles.primary} href="/#music">Back to music</a><a href="/">Home</a></div><RecoveryPreview /></div>
    </main>
    <footer className={styles.footer}><span>Kaysin, Los Angeles</span><a href="/#contact">Bookings & management</a></footer>
  </div>;
}
