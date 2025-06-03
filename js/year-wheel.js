// Porsche 911 years and their video timestamps (in seconds)
const yearData = [
  { year: 1964, timestamp: 0 },
  { year: 1967, timestamp: 4 },
  { year: 1969, timestamp: 8 },
  { year: 1973, timestamp: 12 },
  { year: 1977, timestamp: 20 },
  { year: 1987, timestamp: 24 },
  { year: 1989, timestamp: 27 },
  { year: 1994, timestamp: 33 },
  { year: 1995, timestamp: 36 },
  { year: 1998, timestamp: 40 },
  { year: 2000, timestamp: 43 },
  { year: 2005, timestamp: 48 },
  { year: 2007, timestamp: 52 },
  { year: 2012, timestamp: 57 },
  { year: 2014, timestamp: 61 },
  { year: 2016, timestamp: 64 }
];

const videoSrc = 'assets/evolution.mp4'; // Use your video file

document.addEventListener('DOMContentLoaded', () => {
  const wheel = document.getElementById('year-wheel');
  const video = document.getElementById('year-video');
  // const heroVideo = document.getElementById('hero-video');
  video.src = videoSrc;
  video.muted = false;
  video.controls = true;
  video.playsInline = true;

  // Populate years
  yearData.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'year-wheel-year';
    div.textContent = item.year;
    div.dataset.idx = idx;
    wheel.appendChild(div);
  });

  // Center the first year horizontally
  function scrollToYear(idx) {
    const yearDivs = wheel.querySelectorAll('.year-wheel-year');
    const target = yearDivs[idx];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // Highlight active year
  function setActiveYear(idx) {
    wheel.querySelectorAll('.year-wheel-year').forEach((div, i) => {
      div.classList.toggle('active', i === idx);
    });
  }

  // Seek video to timestamp
  function seekVideo(idx) {
    const ts = yearData[idx].timestamp;
    if (video.readyState >= 2) {
      video.currentTime = ts;
      video.play();
    } else {
      video.addEventListener('loadeddata', function handler() {
        video.currentTime = ts;
        video.play();
        video.removeEventListener('loadeddata', handler);
      });
    }
  }

  // Detect active year on horizontal scroll
  function detectActiveYear() {
    const yearDivs = Array.from(wheel.querySelectorAll('.year-wheel-year'));
    const wheelRect = wheel.getBoundingClientRect();
    let minDist = Infinity, activeIdx = 0;
    yearDivs.forEach((div, i) => {
      const rect = div.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width/2 - (wheelRect.left + wheelRect.width/2));
      if (dist < minDist) {
        minDist = dist;
        activeIdx = i;
      }
    });
    setActiveYear(activeIdx);
    seekVideo(activeIdx);
  }

  // Scroll event
  let scrollTimeout;
  wheel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(detectActiveYear, 80);
  });

  // Click to select year
  wheel.addEventListener('click', e => {
    if (e.target.classList.contains('year-wheel-year')) {
      const idx = parseInt(e.target.dataset.idx, 10);
      scrollToYear(idx);
      setTimeout(detectActiveYear, 350);
    }
  });

  // Initial state
  scrollToYear(0);
  setActiveYear(0);
  seekVideo(0);

  // Remove hero video sound logic to avoid conflicts
  // const heroVideo = document.getElementById('hero-video');
  // function enableHeroVideoSound() {
  //   if (heroVideo) {
  //     heroVideo.muted = false;
  //     heroVideo.volume = 1.0;
  //     heroVideo.play();
  //   }
  // }
  // function onUserInteraction() {
  //   enableHeroVideoSound();
  //   window.removeEventListener('click', onUserInteraction);
  //   window.removeEventListener('keydown', onUserInteraction);
  // }
  // window.addEventListener('click', onUserInteraction);
  // window.addEventListener('keydown', onUserInteraction);
}); 