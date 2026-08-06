
(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.nav-links');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 15);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const isMobile = () => window.matchMedia('(max-width: 760px)').matches;
  const closeMenu = () => {
    navigation?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Menü öffnen');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = !navigation.classList.contains('open');
      navigation.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      document.body.classList.toggle('menu-open', open && isMobile());
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (!isMobile()) closeMenu(); });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -25px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
})();
