document.addEventListener("DOMContentLoaded", () => {

  const stages = document.querySelectorAll('.stage');
  const globalControls = document.getElementById('global-controls');
  const pill = document.getElementById('for-you-global');
  const pillLabel = pill.querySelector('.pill-label');
  
  const volToggleBtn = document.getElementById('vol-toggle-btn');
  const sliderBg = document.getElementById('slider-bg');
  const volumeSlider = document.getElementById('volume-slider');
  const audio = document.getElementById('audio');
  
  const letterCard = document.getElementById('letter-card');
  const sideNudge = document.getElementById('side-nudge');
  
  let isPlaying = false;
  let nudgeTimer = null;
  let nudgeRevealed = false; // Remembers if the nudge was shown

  // Default volume to 5%
  audio.volume = 0.05;

  function goToStage(index) {
    stages.forEach((s, i) => {
      i === index ? s.classList.add('active') : s.classList.remove('active');
    });
    
    // Show global controls (play + volume) from stage 4 onward
    if (index >= 3) {
      globalControls.classList.remove('hidden');
    }
    
    // Logic for Stage 5 (Letter) - 7 second delay for the nudge
    if (index === 4) {
      if (!nudgeRevealed) {
        clearTimeout(nudgeTimer);
        nudgeTimer = setTimeout(() => {
          nudgeRevealed = true; // Mark as revealed so it stays next time
          sideNudge.classList.add('show-nudge');
          setTimeout(() => sideNudge.classList.add('clickable'), 800);
        }, 7000); // 7 seconds
      } else {
        // If they already waited the 7s previously, show it immediately
        sideNudge.classList.add('show-nudge', 'clickable');
      }
    }
  }

  // Navigation Click Listeners
  document.getElementById('s1-click').addEventListener('click', () => goToStage(1));
  document.getElementById('s2-click').addEventListener('click', () => goToStage(2));
  document.getElementById('s3-click').addEventListener('click', () => goToStage(3));
  // Stage 4 click goes to letter
  document.getElementById('s4-click').addEventListener('click', () => goToStage(4));

  // Letter card click goes to stage 6 (Extras)
  letterCard.addEventListener('click', () => {
    // Only go to the next stage if nudge is visible
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

  // Audio Play/Pause Toggle
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

  // Toggle Volume Slider Visibility
  volToggleBtn.addEventListener('click', () => {
    sliderBg.classList.toggle('open');
  });

  // Volume Change Logic
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });
});