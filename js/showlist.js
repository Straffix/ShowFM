var audio = document.getElementById('audio')

function playAudio() {
	audio.play()
}

function stopAudio() {
	audio.pause()
	audio.currentTime = 0
}
