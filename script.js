document.addEventListener("DOMContentLoaded", () => {

  const stages = document.querySelectorAll('.stage');
  const pill = document.getElementById('for-you-global');
  const pillLabel = pill.querySelector('.pill-label');
  const volumeWrap = document.getElementById('volume-wrap');
  const volumeSlider = document.getElementById('volume-slider');
  const audio = document.getElementById('audio');
  const letterCard = document.getElementById('letter-card');
  const sideNudge = document.getElementById('side-nudge');
  let isPlaying = false;
  let pillRevealed = false;
  let nudgeTimer = null;

  // Default volume 25%
  audio.volume = 0.25;

  function goToStage(index) {
    stages.forEach((s, i) => {
      i === index ? s.classList.add('active') : s.classList.remove('active');
    });
    // Show pill from stage 4 onward, keep it
    if (index >= 3) {
      pillRevealed = true;
      pill.classList.remove('hidden');
      volumeWrap.classList.add('visible');
    }
    // Start nudge timer on stage 5
    if (index === 4) {
      clearTimeout(nudgeTimer);
      nudgeTimer = setTimeout(() => {
        sideNudge.classList.add('clickable');
      }, 10000);
    }
  }

  // Navigation
  document.getElementById('s1-click').addEventListener('click', () => goToStage(1));
  document.getElementById('s2-click').addEventListener('click', () => goToStage(2));
  document.getElementById('s3-click').addEventListener('click', () => goToStage(3));
  // Stage 4 click goes to letter - NO autoplay
  document.getElementById('s4-click').addEventListener('click', () => goToStage(4));

  // Letter card click goes to stage 6
  letterCard.addEventListener('click', () => {
    // Only go to stage 6 if nudge is visible (after 10s)
    if (sideNudge.classList.contains('clickable')) {
      goToStage(5);
    }
  });

  // Side nudge click also goes to stage 6
  sideNudge.addEventListener('click', () => goToStage(5));

  // Back arrows
  document.getElementById('back-s1').addEventListener('click', () => goToStage(0));
  document.getElementById('back-s2').addEventListener('click', () => goToStage(1));
  document.getElementById('back-s3').addEventListener('click', () => goToStage(2));
  document.getElementById('back-s4').addEventListener('click', () => goToStage(3));
  document.getElementById('back-s5').addEventListener('click', () => goToStage(4));

  // Audio toggle
  function toggleAudio() {
    if (isPlaying) {
      audio.pause();
      pill.classList.remove('playing');
      pillLabel.textContent = '▶ For you';
    } else {
      audio.play().catch(e => console.log("Audio blocked:", e));
      pill.classList.add('playing');
      pillLabel.textContent = '❚❚ For you';
    }
    isPlaying = !isPlaying;
  }

  pill.addEventListener('click', toggleAudio);

  audio.addEventListener('ended', () => {
    isPlaying = false;
    pill.classList.remove('playing');
    pillLabel.textContent = '▶ For you';
  });

  // Volume
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });
});
