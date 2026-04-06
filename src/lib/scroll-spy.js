export function initScrollSpy() {
  const tocLinks = document.querySelectorAll('.sidebar-toc a[href^="#"]');
  if (!tocLinks.length) return null;

  const sections = [];
  tocLinks.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) sections.push({ el: section, link });

    // Intercept clicks to scroll instead of changing the hash
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  function onScroll() {
    const scrollY = window.scrollY + 100;
    let current = sections[0];

    for (const sec of sections) {
      if (sec.el.offsetTop <= scrollY) {
        current = sec;
      }
    }

    tocLinks.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  return () => window.removeEventListener('scroll', onScroll);
}
