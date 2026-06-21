document.addEventListener("DOMContentLoaded", () => {

  // === STAGE MANAGER ===
  const stages = document.querySelectorAll('.stage');
  let pillRevealed = false;

  function goToStage(index) {
    stages.forEach((s, i) => {
      i === index ? s.classList.add('active') : s.classList.remove('active');
    });
    // Reveal "For you" pill once stage 4 is reached, keep it forever after
    if (index >= 3 && !pillRevealed) {
      pillRevealed = true;
      document.getElementById('for-you-global').classList.remove('hidden');
      document.querySelector('.volume-wrap').classList.add('visible');
    }
    // Re-show pill on stages 4+ even if navigating back then forward
    if (index >= 3) {
      document.getElementById('for-you-global').classList.remove('hidden');
      document.querySelector('.volume-wrap').classList.add('visible');
    }
  }

  // === NAVIGATION ===
  document.getElementById('s1-click').addEventListener('click', () => goToStage(1));
  document.getElementById('s2-click').addEventListener('click', () => goToStage(2));
  document.getElementById('s3-click').addEventListener('click', () => goToStage(3));
  document.getElementById('s4-click').addEventListener('click', () => {
    goToStage(4);
    // Auto start music when entering letter stage
    if (!isPlaying) toggleAudio();
  });

  // Side nudge click goes to stage 6
  document.getElementById('side-nudge').addEventListener('click', () => goToStage(5));
  // Make it clickable after animation
  setTimeout(() => {
    document.getElementById('side-nudge').classList.add('clickable');
  }, 10000);

  // Back arrows
  document.getElementById('back-s1').addEventListener('click', () => goToStage(0));
  document.getElementById('back-s2').addEventListener('click', () => goToStage(1));
  document.getElementById('back-s3').addEventListener('click', () => goToStage(2));
  document.getElementById('back-s4').addEventListener('click', () => goToStage(3));
  document.getElementById('back-s5').addEventListener('click', () => goToStage(4));

  // === AUDIO ===
  const audio = document.getElementById('audio');
  const pill = document.getElementById('for-you-global');
  const volumeSlider = document.getElementById('volume-slider');
  let isPlaying = false;

  // Default volume at 50%
  audio.volume = 0.5;
  if (volumeSlider) volumeSlider.value = 50;

  function toggleAudio() {
    if (isPlaying) {
      audio.pause();
      pill.classList.remove('playing');
      // Update icon back to play
      pill.childNodes[0].textContent = '▶ For you';
    } else {
      audio.play().catch(e => console.log("Audio blocked:", e));
      pill.classList.add('playing');
    }
    isPlaying = !isPlaying;
  }

  pill.addEventListener('click', toggleAudio);

  audio.addEventListener('ended', () => {
    isPlaying = false;
    pill.classList.remove('playing');
  });

  // Volume control
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value / 100;
    });
  }
});
