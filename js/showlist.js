document.addEventListener('DOMContentLoaded', function () {
	const boxes = document.querySelectorAll('.showlistBox')

	boxes.forEach(function (showlistBox) {
		const playIcon = showlistBox.querySelector('.ti-player-play')
		const youtubeIcon = showlistBox.querySelector('.ti-brand-youtube')

		showlistBox.addEventListener('mouseover', function (event) {
			if (event.target === playIcon) {
				playIcon.classList.remove('ti-player-play')
				playIcon.classList.add('ti-player-play-filled')
			} else if (event.target === youtubeIcon) {
				youtubeIcon.classList.remove('ti-brand-youtube')
				youtubeIcon.classList.add('ti-brand-youtube-filled')
			}
		})

		showlistBox.addEventListener('mouseout', function (event) {
			if (event.target === playIcon) {
				playIcon.classList.remove('ti-player-play-filled')
				playIcon.classList.add('ti-player-play')
			} else if (event.target === youtubeIcon) {
				youtubeIcon.classList.remove('ti-brand-youtube-filled')
				youtubeIcon.classList.add('ti-brand-youtube')
			}
		})
	})

	const audio = document.getElementById('audio')

	function playAudio() {
		audio.play()
	}

	function stopAudio() {
		audio.pause()
		audio.currentTime = 0
	}

	const showList = new Audio()
	let playButt = null

	function handleButtonClick(showButt, showElem, showSource) {
		showButt.addEventListener('click', function () {
			if (playButt !== showButt) {
				if (playButt) {
					playButt.innerHTML = '<i class="ti ti-player-play"></i>'
					showList.pause()
				}

				showList.src = showSource
				showList.play()
				showButt.innerHTML = '<i class="ti ti-player-pause"></i>'

				playButt = showButt

				// Dodaj nasłuchiwanie zdarzeń mouseover i mouseout dla nowych ikon
				const playIcon = showButt.querySelector('.ti-player-play')
				const pauseIcon = showButt.querySelector('.ti-player-pause')
				const youtubeIcon = showButt.querySelector('.ti-brand-youtube')

				showButt.addEventListener('mouseover', function (event) {
					if (event.target === playIcon) {
						playIcon.classList.remove('ti-player-play')
						playIcon.classList.add('ti-player-play-filled')
					} else if (event.target === pauseIcon) {
						pauseIcon.classList.remove('ti-player-pause')
						pauseIcon.classList.add('ti-player-pause-filled')
					} else if (event.target === youtubeIcon) {
						youtubeIcon.classList.remove('ti-brand-youtube')
						youtubeIcon.classList.add('ti-brand-youtube-filled')
					}
				})

				showButt.addEventListener('mouseout', function (event) {
					if (event.target === playIcon) {
						playIcon.classList.remove('ti-player-play-filled')
						playIcon.classList.add('ti-player-play')
					} else if (event.target === pauseIcon) {
						pauseIcon.classList.remove('ti-player-pause-filled')
						pauseIcon.classList.add('ti-player-pause')
					} else if (event.target === youtubeIcon) {
						youtubeIcon.classList.remove('ti-brand-youtube-filled')
						youtubeIcon.classList.add('ti-brand-youtube')
					}
				})
			} else {
				showList.pause()
				showButt.innerHTML = '<i class="ti ti-player-play"></i>'
				playButt = null
			}
		})
	}

	const no_1Button = document.getElementById('no_1')
	const no_1 = document.querySelector('.no_1')
	handleButtonClick(
		no_1Button,
		no_1,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8508062826727/PS9uUgipBAk.mp3'
	)
	const no_2Button = document.getElementById('no_2')

	no_2Button.addEventListener('click', function () {
		const youtubeUrl = 'https://www.youtube.com/embed/nIxih1JE12U?si=YRtRdRiWqn_ZEqnB&autoplay=1'
		const windowFeatures = 'width=640, height=360'
		window.open(youtubeUrl, 'YouTube Video', windowFeatures)
	})
	const no_3Button = document.getElementById('no_3')
	const no_3 = document.querySelector('.no_3')
	handleButtonClick(
		no_3Button,
		no_3,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8597533491431/pY_JZchodog.mp3'
	)
	const no_4Button = document.getElementById('no_4')
	const no_4 = document.querySelector('.no_4')
	handleButtonClick(
		no_4Button,
		no_4,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8594582175975/Pl2OdgEta7Y.mp3'
	)
	const no_5Button = document.getElementById('no_5')
	const no_5 = document.querySelector('.no_5')
	handleButtonClick(
		no_5Button,
		no_5,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8576501743847/0pUoiOoresQ.mp3'
	)
	const no_6Button = document.getElementById('no_6')
	const no_6 = document.querySelector('.no_6')
	handleButtonClick(no_6Button, no_6, '/mp3/Riesling feat. Zach Alwin - On My Ride.mp3')

	const no_7Button = document.getElementById('no_7')
	const no_7 = document.querySelector('.no_7')
	handleButtonClick(
		no_7Button,
		no_7,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/4752957636657/5ORRlf2tJKM.mp3'
	)
	const no_8Button = document.getElementById('no_8')
	const no_8 = document.querySelector('.no_8')
	handleButtonClick(
		no_8Button,
		no_8,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/4629643460657/Ug12rNE-Q-8.mp3'
	)
	const no_9Button = document.getElementById('no_9')
	const no_9 = document.querySelector('.no_9')
	handleButtonClick(
		no_9Button,
		no_9,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/1451225677868/song.mp3'
	)
	const no_10Button = document.getElementById('no_10')
	const no_10 = document.querySelector('.no_10')
	handleButtonClick(
		no_10Button,
		no_10,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/1498639269932/song.mp3'
	)
})
