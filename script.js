document.addEventListener("DOMContentLoaded", () => {
  const stages = Array.from(document.querySelectorAll('.stage'));
  const pill = document.getElementById('for-you-global');
  const pillLabel = pill.querySelector('.pill-label');
  const volumeWrap = document.getElementById('volume-wrap');
  const volumeSlider = document.getElementById('volume-slider');
  const audio = document.getElementById('audio');
  const letterCard = document.getElementById('letter-card');
  const sideNudge = document.getElementById('side-nudge');
  const musicIcon = document.getElementById('music-icon');
  const arrowUp = document.getElementById('arrow-up');

  let isPlaying = false;
  let pillRevealed = false;
  let nudgeTimer = null;
  let showNudgeTimer = null;

  // Default volume 5%
  audio.volume = 0.05;
  if (volumeSlider) volumeSlider.value = 5;

  function goToStage(index) {
    stages.forEach((s, i) => {
      i === index ? s.classList.add('active') : s.classList.remove('active');
    });

    // Show pill from stage 4 onward, keep it
    if (index >= 3) {
      pillRevealed = true;
      pill.classList.remove('hidden');
      volumeWrap.classList.add('visible');
      // show arrow above pill only when pill is visible
      if (arrowUp) arrowUp.style.display = 'block';
    } else {
      if (arrowUp) arrowUp.style.display = 'none';
    }

    // Stage index mapping note: stages array order follows DOM order s1 -> s7
    // Start nudge timer on stage 5 (index 4)
    if (index === 4) {
      clearTimeout(nudgeTimer);
      // show the side nudge after 15 seconds (15000ms)
      nudgeTimer = setTimeout(() => {
        sideNudge.classList.add('clickable');
        sideNudge.style.opacity = 1;
      }, 15000);
    } else {
      clearTimeout(nudgeTimer);
      sideNudge.classList.remove('clickable');
    }
  }

  // Navigation: map clicks to stage indices by DOM order
  document.getElementById('s1-click').addEventListener('click', () => goToStage(1));
  document.getElementById('s2-click').addEventListener('click', () => goToStage(2));
  document.getElementById('s3-click').addEventListener('click', () => goToStage(3));
  document.getElementById('s4-click').addEventListener('click', () => goToStage(4));

  // Letter card click goes to stage 6 only after nudge is clickable
  letterCard.addEventListener('click', () => {
    // If side nudge is clickable, go to stage 6 (index 5)
    if (sideNudge.classList.contains('clickable')) {
      goToStage(5);
      // After entering stage 6, set a timer to show the arrow/message and enable final click to stage 7
      setTimeout(() => {
        // show arrow and message (side-nudge already has message)
        sideNudge.classList.add('clickable');
      }, 15000);
    } else {
      // If in stage 5 and user clicks again after the 15s nudge, go to stage 6
      // If you want clicking letter to go to stage 7 after the nudge, handle below
    }
  });

  // Side nudge click also goes to stage 6 (index 5)
  sideNudge.addEventListener('click', () => goToStage(5));

  // Back arrows (update indices to match DOM order)
  document.getElementById('back-s1').addEventListener('click', () => goToStage(0));
  document.getElementById('back-s2').addEventListener('click', () => goToStage(1));
  document.getElementById('back-s3').addEventListener('click', () => goToStage(2));
  document.getElementById('back-s4').addEventListener('click', () => goToStage(3));
  document.getElementById('back-s5').addEventListener('click', () => goToStage(4));
  // back-s6 for stage 7 if present
  const backS6 = document.getElementById('back-s6');
  if (backS6) backS6.addEventListener('click', () => goToStage(5));

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

  // Volume slider updates audio volume
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });

  // Music icon behavior: when clicked, set slider to 5% and toggle audio
  if (musicIcon) {
    musicIcon.addEventListener('click', () => {
      // set to 5% visually and in audio
      volumeSlider.value = 5;
      audio.volume = 0.05;
      // animate the slider briefly (optional)
      musicIcon.classList.add('active');
      setTimeout(() => musicIcon.classList.remove('active'), 300);
      // toggle audio play/pause
      toggleAudio();
    });
  }

  // Arrow above pill: clicking it will hint to click the pill (optional)
  if (arrowUp) {
    arrowUp.style.display = 'none'; // hidden until pill revealed
    arrowUp.addEventListener('click', () => {
      // small pulse on the pill to draw attention
      pill.classList.add('pulse');
      setTimeout(() => pill.classList.remove('pulse'), 600);
    });
  }

  // Stage 6 -> after 15s show message and allow clicking letter to go to stage 7
  // When entering stage 6 (index 5), set up a timer to show the message and enable final click
  const observer = new MutationObserver(() => {
    const activeIndex = stages.findIndex(s => s.classList.contains('active'));
    if (activeIndex === 5) {
      // show arrow and message after 15s
      clearTimeout(showNudgeTimer);
      showNudgeTimer = setTimeout(() => {
        // show the side nudge message and arrow (if hidden)
        sideNudge.classList.add('clickable');
        // now clicking the letter should go to stage 7 (index 6)
        letterCard.addEventListener('click', goToStage7Once, { once: true });
      }, 15000);
    } else {
      clearTimeout(showNudgeTimer);
    }
  });

  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

  function goToStage7Once() {
    // go to stage 7 (index 6)
    goToStage(6);
  }

  // Initialize: hide arrow until pill is revealed
  if (!pillRevealed && arrowUp) arrowUp.style.display = 'none';
});