import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import './interactions.css';
import './hybrid.css';

export const metadata = {
  title: 'KAYSIN | Music, live sets & shows',
  description: 'Music, live sets and bookings from Los Angeles DJ, producer and A&R Kaysin.',
  robots: { index: false, follow: false },
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#172736' };

export default function Layout({ children }) {
  return <html lang="en"><body><SmoothScroll />{children}</body></html>;
}
