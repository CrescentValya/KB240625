document.addEventListener("DOMContentLoaded", () => {
  const stages = document.querySelectorAll('.stage');
  const globalControls = document.getElementById('global-controls');
  const letterCard = document.getElementById('letter-card');
  const sideNudge = document.getElementById('side-nudge');
  const audio = document.getElementById('audio');
  const volSlider = document.getElementById('volume-slider');
  const volBtn = document.getElementById('vol-toggle-btn');
  
  let isPlaying = false;
  let nudgeRevealed = false;

  // --- 1. Audio Logic ---
  volSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
  });

  volBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      isPlaying = true;
      volBtn.classList.add('active');
    } else {
      audio.pause();
      isPlaying = false;
      volBtn.classList.remove('active');
    }
  });

  // --- 2. Navigation Logic ---
  function goToStage(index) {
    stages.forEach((s, i) => i === index ? s.classList.add('active') : s.classList.remove('active'));
    
    // Show global controls starting from Stage 3
    if (index >= 2) {
      globalControls.classList.remove('hidden');
    } else {
      globalControls.classList.add('hidden');
    }
    
    // Nudge Logic for Stage 5
    if (index === 4) {
      if (!nudgeRevealed) {
        setTimeout(() => {
          nudgeRevealed = true;
          sideNudge.classList.add('show-nudge', 'clickable');
        }, 5000); // 5 seconds delay
      } else {
        sideNudge.classList.add('show-nudge', 'clickable');
      }
    }
  }

  // --- 3. Click Event Listeners ---
  document.getElementById('s1-click').addEventListener('click', () => goToStage(1));
  document.getElementById('s2-click').addEventListener('click', () => goToStage(2));
  document.getElementById('s3-click').addEventListener('click', () => goToStage(3));
  document.getElementById('s4-click').addEventListener('click', () => goToStage(4));
  
  // Letter Card interaction
  if (letterCard) {
    letterCard.addEventListener('click', () => { 
      if(sideNudge.classList.contains('clickable')) goToStage(5); 
    });
  }
  
  // Back buttons
  document.getElementById('back-s1').addEventListener('click', () => goToStage(0));
  document.getElementById('back-s2').addEventListener('click', () => goToStage(1));
  document.getElementById('back-s3').addEventListener('click', () => goToStage(2));
  document.getElementById('back-s4').addEventListener('click', () => goToStage(3));
  document.getElementById('back-s5').addEventListener('click', () => goToStage(4));

  // Global "For You" (Play/Pause)
  document.getElementById('for-you-global').addEventListener('click', () => {
    if (audio.paused) { audio.play(); } else { audio.pause(); }
  });
});