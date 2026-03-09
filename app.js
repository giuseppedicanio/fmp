const upload = document.getElementById("upload")
const player = document.getElementById("player")
const video = document.getElementById("video")

const play = document.getElementById("play")
const progress = document.getElementById("progress")
const volume = document.getElementById("volume")
const fullscreen = document.getElementById("fullscreen")

upload.addEventListener("change", () => {

    const file = upload.files[0]
    if(!file) return

    const url = URL.createObjectURL(file)

    video.src = url

    upload.style.display = "none"
    player.style.display = "block"

})

play.onclick = () => {

    if(video.paused){
        video.play()
        play.textContent = "Pause"
    }else{
        video.pause()
        play.textContent = "Play"
    }

}

video.addEventListener("timeupdate", () => {

    const percent = (video.currentTime / video.duration) * 100
    progress.value = percent

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
