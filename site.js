'use strict';

const versions = [...document.querySelectorAll('.version')];
const expand = document.querySelector('#expand-versions');
expand.hidden = false;
function updateExpandLabel() {
  const allOpen = versions.every(version => version.open);
  expand.textContent = allOpen ? 'Свернуть все −' : 'Развернуть все +';
}
expand.addEventListener('click', () => {
  const open = !versions.every(version => version.open);
  versions.forEach(version => { version.open = open; });
  updateExpandLabel();
});
versions.forEach(version => version.addEventListener('toggle', updateExpandLabel));
function openLinkedVersion() {
  const target = document.getElementById(location.hash.slice(1));
  if (target && target.matches('.version')) target.open = true;
}
window.addEventListener('hashchange', openLinkedVersion);
openLinkedVersion();

const navLinks = [...document.querySelectorAll('.side-nav>a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  navLinks.forEach(link => {
    const target = document.getElementById(link.hash.slice(1));
    if (target) observer.observe(target);
  });
}
