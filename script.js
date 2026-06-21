document.addEventListener("DOMContentLoaded", () => {
  const stages = document.querySelectorAll('.stage');
  const audio = document.getElementById('audio');
  
  // Grab all the "For you" play buttons
  const playBtns = [
    document.getElementById('play-btn'), 
    document.getElementById('play-btn-2'), 
    document.getElementById('play-btn-3')
  ];

  // Helper function to hide all stages and show the one we want
  function goToStage(stageIndex) {
    stages.forEach((stage, idx) => {
      if (idx === stageIndex) {
        stage.classList.add('active');
      } else {
        stage.classList.remove('active');
      }
    });
  }

  // --- FORWARD CLICKS ---
  // Stage 1 (Closed Env) -> Stage 2 (Open Env)
  document.getElementById('s1-click')?.addEventListener('click', () => goToStage(1));
  
  // Stage 2 (Open Env) -> Stage 3 (Robin Card)
  document.getElementById('s2-click')?.addEventListener('click', () => goToStage(2));
  
  // Stage 3 (Robin Card) -> Stage 4 (Song Prompt)
  document.getElementById('s3-click')?.addEventListener('click', () => goToStage(3));
  
  // Stage 4 (Song Prompt) -> Stage 5 (Letter)
  document.getElementById('s4-click')?.addEventListener('click', () => goToStage(4));
  
  // Stage 5 Side Nudge -> Stage 6 (Back of Card)
  document.getElementById('go-to-back')?.addEventListener('click', () => goToStage(5));

  // --- BACK CLICKS (The little arrow) ---
  document.getElementById('back-s1')?.addEventListener('click', () => goToStage(0));
  document.getElementById('back-s2')?.addEventListener('click', () => goToStage(1));
  document.getElementById('back-s3')?.addEventListener('click', () => goToStage(2));
  document.getElementById('back-s4')?.addEventListener('click', () => goToStage(3));
  document.getElementById('back-s5')?.addEventListener('click', () => goToStage(4));

  // --- AUDIO PLAYER LOGIC ---
  let isPlaying = false;
  function toggleAudio() {
    if (isPlaying) {
      audio.pause();
      playBtns.forEach(btn => btn?.classList.remove('playing'));
    } else {
      audio.play().catch(e => console.log("Audio play blocked by browser", e));
      playBtns.forEach(btn => btn?.classList.add('playing'));
    }
    isPlaying = !isPlaying;
  }

  // Attach the audio logic to all the play buttons
  playBtns.forEach(btn => {
    btn?.addEventListener('click', toggleAudio);
  });
});