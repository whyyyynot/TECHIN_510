// Overview Menu JS (Desktop Only)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.overview-menu-btn');
  const panel = document.querySelector('.overview-menu-panel');
  if (!btn || !panel) return;

  // Only enable on desktop
  function isDesktop() {
    return window.innerWidth >= 769;
  }

  let open = false;
  function updatePanelPosition() {
    console.log('updatePanelPosition called');
    if (!btn.classList.contains('sticky-btn')) {
      panel.classList.remove('sticky-panel');
      panel.style.top = '';
      panel.style.left = '';
      panel.style.minWidth = '';
      console.log('Not sticky');
    } else {
      panel.classList.add('sticky-panel');
      const btnRect = btn.getBoundingClientRect();
      panel.style.top = (btnRect.bottom + 8) + 'px'; // 8px gap
      panel.style.left = btnRect.left + 'px';
      panel.style.minWidth = btnRect.width + 'px';
      console.log('Sticky', panel.style.top, panel.style.left);
    }
  }
  function openPanel() {
    if (!isDesktop()) return;
    panel.classList.add('open');
    open = true;
    updatePanelPosition();
  }
  function closePanel() {
    panel.classList.remove('open');
    open = false;
    updatePanelPosition();
  }
  btn.addEventListener('mouseenter', openPanel);
  btn.addEventListener('mouseleave', () => setTimeout(() => { if (!panel.matches(':hover')) closePanel(); }, 200));
  panel.addEventListener('mouseleave', closePanel);
  btn.addEventListener('click', () => {
    if (!isDesktop()) return;
    if (open) closePanel(); else openPanel();
  });
  // Smooth scroll for links
  panel.querySelectorAll('.overview-menu-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closePanel();
      }
    });
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !panel.contains(e.target)) closePanel();
  });
  // Responsive: close on resize to mobile
  window.addEventListener('resize', () => { if (!isDesktop()) closePanel(); updatePanelPosition(); });
  window.addEventListener('scroll', updatePanelPosition);
});

function handleStickyBtns() {
  const muteBtn = document.getElementById('mute-btn');
  const overviewBtn = document.querySelector('.overview-menu-btn');
  if (window.scrollY > 100) {
    muteBtn && muteBtn.classList.add('sticky-btn');
    overviewBtn && overviewBtn.classList.add('sticky-btn');
  } else {
    muteBtn && muteBtn.classList.remove('sticky-btn');
    overviewBtn && overviewBtn.classList.remove('sticky-btn');
  }
}
window.addEventListener('scroll', handleStickyBtns);
handleStickyBtns(); 