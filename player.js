const fileInput = document.getElementById("fileInput");
const player = document.getElementById("player");
const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seekBar");
const fsBtn = document.getElementById("fsBtn");

let objectUrl = null;
let isSeeking = false;

// Carica video dal file input
fileInput.addEventListener("change", () => {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;

  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(file);

  video.src = objectUrl;
  video.load();
  video.play();

  player.style.display = "flex";
});

// Play / pausa
playPauseBtn.addEventListener("click", () => {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener("play", () => {
  playPauseBtn.textContent = "Pausa";
});

video.addEventListener("pause", () => {
  playPauseBtn.textContent = "Play";
});

// Barra di avanzamento
video.addEventListener("timeupdate", () => {
  if (!video.duration || isSeeking) return;
  const ratio = video.currentTime / video.duration;
  seekBar.value = ratio * 100;
});

seekBar.addEventListener("input", () => {
  if (!video.duration) return;
  isSeeking = true;
  const ratio = seekBar.value / 100;
  video.currentTime = ratio * video.duration;
});

seekBar.addEventListener("change", () => {
  isSeeking = false;
});

// Fullscreen del player (video resta flippato, controlli normali)
fsBtn.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    if (player.requestFullscreen) {
      await player.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  }
});
