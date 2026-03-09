const fileInput = document.getElementById("fileInput")
const video = document.getElementById("video")
const playBtn = document.getElementById("play")
const progress = document.getElementById("progress")
const time = document.getElementById("time")

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0]

    if(!file) return

    const url = URL.createObjectURL(file)

    video.src = url
})

playBtn.addEventListener("click", () => {

    if(video.paused){
        video.play()
        playBtn.textContent = "Pause"
    }else{
        video.pause()
        playBtn.textContent = "Play"
    }

})

video.addEventListener("timeupdate", () => {

    const percent = (video.currentTime / video.duration) * 100
    progress.value = percent

    const minutes = Math.floor(video.currentTime / 60)
    const seconds = Math.floor(video.currentTime % 60).toString().padStart(2,"0")

    time.textContent = `${minutes}:${seconds}`

})

progress.addEventListener("input", () => {

    const time = (progress.value / 100) * video.duration
    video.currentTime = time

})
