document.addEventListener('DOMContentLoaded', function () {
	const boxes = document.querySelectorAll('.box')

	boxes.forEach(function (box) {
		const playIcon = box.querySelector('.ti-player-play')
		const youtubeIcon = box.querySelector('.ti-brand-youtube')

		box.addEventListener('mouseover', function () {
			playIcon.classList.remove('ti-player-play')
			playIcon.classList.add('ti-player-play-filled')
		})

		box.addEventListener('mouseout', function () {
			playIcon.classList.remove('ti-player-play-filled')
			playIcon.classList.add('ti-player-play')
		})

		box.addEventListener('mouseover', function () {
			youtubeIcon.classList.remove('ti-brand-youtube')
			youtubeIcon.classList.add('ti-brand-youtube-filled')
		})

		box.addEventListener('mouseout', function () {
			youtubeIcon.classList.remove('ti-brand-youtube-filled')
			youtubeIcon.classList.add('ti-brand-youtube')
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
				showButt.innerHTML = '<i class="ti ti-player-pause-filled"></i>'

				playButt = showButt
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
	handleButtonClick(
		no_6Button,
		no_6,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8613959205095/xumrprViaSM.mp3'
	)

	const no_7Button = document.getElementById('no_7')
	const no_7 = document.querySelector('.no_7')
	handleButtonClick(
		no_7Button,
		no_7,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8613959205095/xumrprViaSM.mp3'
	)
	const no_8Button = document.getElementById('no_8')
	const no_8 = document.querySelector('.no_8')
	handleButtonClick(
		no_8Button,
		no_8,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8613959205095/xumrprViaSM.mp3'
	)
	const no_9Button = document.getElementById('no_9')
	const no_9 = document.querySelector('.no_9')
	handleButtonClick(
		no_9Button,
		no_9,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8613959205095/xumrprViaSM.mp3'
	)
	const no_10Button = document.getElementById('no_10')
	const no_10 = document.querySelector('.no_10')
	handleButtonClick(
		no_10Button,
		no_10,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8613959205095/xumrprViaSM.mp3'
	)
})
