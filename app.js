const upload = document.getElementById("upload")
const player = document.getElementById("player")
const video = document.getElementById("video")

const playBtn = document.getElementById("play")
const progress = document.getElementById("progress")
const volume = document.getElementById("volume")
const fullscreen = document.getElementById("fullscreen")
const time = document.getElementById("time")

function formatTime(seconds){

const m = Math.floor(seconds / 60)
const s = Math.floor(seconds % 60).toString().padStart(2,"0")

return m + ":" + s

}

upload.addEventListener("change", () => {

const file = upload.files[0]

if(!file) return

const url = URL.createObjectURL(file)

video.src = url

upload.style.display = "none"
player.style.display = "block"

})

playBtn.onclick = () => {

if(video.paused){

video.play()
playBtn.textContent = "Pause"

}else{

video.pause()
playBtn.textContent = "Play"

}

}

video.addEventListener("timeupdate", () => {

const percent = (video.currentTime / video.duration) * 100
progress.value = percent

time.textContent =
formatTime(video.currentTime) +
" / " +
formatTime(video.duration)

})

progress.addEventListener("input", () => {

video.currentTime = (progress.value / 100) * video.duration

})

volume.addEventListener("input", () => {

video.volume = volume.value

})

fullscreen.onclick = () => {

video.requestFullscreen()

}
