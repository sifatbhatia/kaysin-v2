'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = [['Music', '#music'], ['Live', '#live'], ['About', '#about'], ['Contact', '#contact']];

function MenuGlyph({ open }) {
  return <span className={`menu-glyph${open ? ' is-cross' : ''}`} aria-hidden="true"><span /><span /></span>;
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const closeButton = useRef(null);
  const openState = useRef(false);
  const closeTimer = useRef(null);
  const frames = useRef([]);
  const destination = useRef(null);
  const restoreScroll = useRef(null);

  const finishClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    if (!dialog.current?.open) return;
    gsap.killTweensOf(dialog.current);
    dialog.current.close();
    restoreScroll.current?.();
    restoreScroll.current = null;
    const href = destination.current;
    destination.current = null;
    if (href) {
      const target = document.querySelector(href);
      window.history.pushState(null, '', href);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) target.scrollIntoView({ behavior: 'instant' });
        else window.dispatchEvent(new CustomEvent('kaysin:scroll-to', { detail: href }));
      }
    } else if (window.matchMedia('(max-width: 700px)').matches) {
      trigger.current?.focus({ preventScroll: true });
    }
  }, []);

  const closeMenu = useCallback((href = null, immediate = false) => {
    const panel = dialog.current;
    openState.current = false;
    setOpen(false);
    destination.current = href;
    window.dispatchEvent(new Event('kaysin:menu-close'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!panel || immediate || reduce) {
      if (panel) gsap.set(panel, { clearProps: 'clipPath' });
      finishClose();
      return;
    }
    gsap.killTweensOf(panel);
    gsap.to(panel, {
      clipPath: `circle(0px at ${panel.style.getPropertyValue('--menu-x')} ${panel.style.getPropertyValue('--menu-y')})`,
      duration: 0.36,
      ease: 'power2.in',
      overwrite: true,
      onComplete: finishClose,
    });
  }, [finishClose]);

  const openMenu = useCallback(() => {
    const panel = dialog.current;
    if (!panel) return;
    window.clearTimeout(closeTimer.current);
    frames.current.forEach(frame => window.cancelAnimationFrame(frame));
    frames.current = [];
    destination.current = null;
    const rect = trigger.current.getBoundingClientRect();
    panel.style.setProperty('--menu-x', `${rect.right - 16}px`);
    panel.style.setProperty('--menu-y', `${rect.top + rect.height / 2}px`);
    if (!panel.open) {
      const previous = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      restoreScroll.current = () => { document.documentElement.style.overflow = previous; };
      panel.showModal();
    }
    openState.current = true;
    setOpen(true);
    window.dispatchEvent(new Event('kaysin:menu-open'));
    closeButton.current?.focus({ preventScroll: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const origin = `circle(0px at ${rect.right - 16}px ${rect.top + rect.height / 2}px)`;
    const expanded = `circle(150vmax at ${rect.right - 16}px ${rect.top + rect.height / 2}px)`;
    gsap.killTweensOf(panel);
    if (reduce) gsap.set(panel, { clipPath: expanded });
    else gsap.fromTo(panel, { clipPath: origin }, { clipPath: expanded, duration: 0.68, ease: 'power4.out', overwrite: true });
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 701px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onResize = () => { if (desktop.matches && dialog.current?.open) closeMenu(null, true); };
    const onReduce = () => { if (reduce.matches && !openState.current) finishClose(); };
    const updateOrigin = () => {
      if (!dialog.current?.open || desktop.matches) return;
      const rect = trigger.current.getBoundingClientRect();
      dialog.current.style.setProperty('--menu-x', `${rect.right - 16}px`);
      dialog.current.style.setProperty('--menu-y', `${rect.top + rect.height / 2}px`);
    };
    window.addEventListener('resize', updateOrigin, { passive: true });
    desktop.addEventListener('change', onResize);
    reduce.addEventListener('change', onReduce);
    return () => {
      window.removeEventListener('resize', updateOrigin);
      desktop.removeEventListener('change', onResize);
      reduce.removeEventListener('change', onReduce);
      frames.current.forEach(frame => window.cancelAnimationFrame(frame));
      restoreScroll.current?.();
    };
  }, [closeMenu, finishClose]);

  function follow(event, href) {
    event.preventDefault();
    closeMenu(href);
  }

  function trapTab(event) {
    if (event.key !== 'Tab') return;
    const items = [...dialog.current.querySelectorAll('a[href],button')];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <header className="site-header page-gutter">
      <a className="nav-social" href="https://www.instagram.com/kaysin/" target="_blank" rel="noreferrer">Instagram</a>
      <nav className="desktop-navigation" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <button ref={trigger} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={openMenu}>
        Menu <MenuGlyph open={false} />
      </button>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        data-open={open}
        aria-label="Site navigation"
        onCancel={event => { event.preventDefault(); closeMenu(); }}
        onKeyDown={trapTab}
      >
        <div className="mobile-menu-header">
          <a className="nav-brand" href="#top" onClick={event => follow(event, '#top')} aria-label="Kaysin home"><img src="/images/wordmark-white.svg" width="666" height="102" alt="KAYSIN" /></a>
          <button ref={closeButton} className="menu-toggle" type="button" onClick={() => openState.current ? closeMenu() : openMenu()}>
            {open ? 'Close' : 'Menu'} <MenuGlyph open={open} />
          </button>
        </div>
        <nav className="menu-links" aria-label="Mobile navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={event => follow(event, href)}><span>{label}</span></a>)}
        </nav>
        <div className="menu-footer">
          <a href="https://www.instagram.com/kaysin/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://open.spotify.com/artist/10mZhaOPNKtQfg46DptrBU" target="_blank" rel="noreferrer">Spotify</a>
        </div>
      </dialog>
    </header>
  );
}
