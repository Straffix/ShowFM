document.addEventListener('DOMContentLoaded', function () {
	const logoScaled = document.querySelector('.logo')
	const nav = document.querySelector('.nav')
	const navBg = document.querySelector('.smallNavBg')

	function handleScroll() {
		if (window.scrollY > 50) {
			logoScaled.classList.add('logo--scaled')
			nav.classList.add('nav--scaled')
			navBg.style.opacity = '1'
		} else {
			logoScaled.classList.remove('logo--scaled')
			nav.classList.remove('nav--scaled')
			navBg.style.opacity = '0'
		}
	}

	window.addEventListener('scroll', function () {
		handleScroll()
	})

	handleScroll()
})

// ==================== Players Button

document.addEventListener('DOMContentLoaded', function () {
	const audioPlayer = new Audio()
	const playButton = document.getElementById('play-button')
	let isPlaying = false

	playButton.addEventListener('click', function () {
		if (isPlaying) {
			audioPlayer.pause()
			playButton.innerHTML = '<i class="fa-solid fa-play"></i>'
		} else {
			audioPlayer.src = 'http://eu1.fastcast4u.com:1938/;'
			audioPlayer.play()
			playButton.innerHTML = '<i class="fa-solid fa-stop fa-beat-fade"></i>'
		}

		isPlaying = !isPlaying
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const audioPlayer2 = new Audio()
	const playButton2 = document.getElementById('play-button2')
	let isPlaying = false

	playButton2.addEventListener('click', function () {
		if (isPlaying) {
			audioPlayer2.pause()
			playButton2.innerHTML = '<i class="fa-solid fa-play"></i>'
		} else {
			audioPlayer2.src = 'http://eu1.fastcast4u.com:1942/;'
			audioPlayer2.play()
			playButton2.innerHTML = '<i class="fa-solid fa-stop fa-beat-fade"></i>'
		}

		isPlaying = !isPlaying
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const audioPlayer3 = new Audio()
	const playButton3 = document.getElementById('play-button3')
	let isPlaying = false

	playButton3.addEventListener('click', function () {
		if (isPlaying) {
			audioPlayer3.pause()
			playButton3.innerHTML = '<i class="fa-solid fa-play"></i>'
		} else {
			audioPlayer3.src = 'http://eu1.fastcast4u.com:2050/;'
			audioPlayer3.play()
			playButton3.innerHTML = '<i class="fa-solid fa-stop fa-beat-fade"></i>'
		}

		isPlaying = !isPlaying
	})
})

// --------------
