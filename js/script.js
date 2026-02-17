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
	function setupAudioPlayer(audioPlayer, playButton, streamURL) {
		let isPlaying = false

		playButton.addEventListener('click', function () {
			if (isPlaying) {
				audioPlayer.pause()
				playButton.innerHTML = '<i class="fa-solid fa-play"></i>'
			} else {
				// Zatrzymaj odtwarzanie innych audioPlayerów
				stopAllAudioPlayers()

				audioPlayer.src = streamURL
				audioPlayer.play()
				playButton.innerHTML = '<i class="fa-solid fa-stop fa-beat-fade"></i>'
			}

			isPlaying = !isPlaying
		})
	}

	function stopAllAudioPlayers() {
		audioPlayer1.pause()
		playButton1.innerHTML = '<i class="fa-solid fa-play"></i>'
		audioPlayer2.pause()
		playButton2.innerHTML = '<i class="fa-solid fa-play"></i>'
		audioPlayer3.pause()
		playButton3.innerHTML = '<i class="fa-solid fa-play"></i>'
	}

	const audioPlayer1 = new Audio()
	const playButton1 = document.getElementById('play-button')
	//setupAudioPlayer(audioPlayer1, playButton1, 'https://eu1.fastcast4u.com:1938/;')
	setupAudioPlayer(audioPlayer1, playButton1, 'https://eu1.fastcast4u.com:1938/stream')

	const audioPlayer2 = new Audio()
	const playButton2 = document.getElementById('play-button2')
	setupAudioPlayer(audioPlayer2, playButton2, 'https://eu1.fastcast4u.com:1942/;')

	const audioPlayer3 = new Audio()
	const playButton3 = document.getElementById('play-button3')
	setupAudioPlayer(audioPlayer3, playButton3, 'https://eu1.fastcast4u.com:2050/;')
})

//

function openNewWindow(url, width, height) {
	window.open(url, '_blank', 'width=' + width + ', height=' + height)
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.web-p1, .web-p2, .web-p3').forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault()
			openNewWindow('players.html', 1200, 165)
		})
	})
})

// ----------------------- DJ Prev

document.addEventListener('DOMContentLoaded', function () {
	const djPlayer = new Audio()
	let currentPlayingButton = null
	let currentPlayingElement = null

	function handleButtonClick(djButton, djElement, audioSource) {
		djButton.addEventListener('click', function () {
			if (currentPlayingButton !== djButton) {
				// Pause the currently playing DJ and remove animation
				if (currentPlayingButton) {
					currentPlayingButton.innerHTML = '<i class="fa-solid fa-play"></i>'
					currentPlayingButton.style.color = '#fff'
					currentPlayingElement.classList.remove('clr-anim')
					djPlayer.pause()
				}

				// Start the new DJ
				djPlayer.src = audioSource
				djPlayer.play()
				djButton.innerHTML = '<i class="fa-solid fa-stop fa-beat-fade"></i>'
				djButton.style.color = '#00ccff'
				djElement.classList.add('clr-anim')

				// Update the currently playing button and element
				currentPlayingButton = djButton
				currentPlayingElement = djElement
			} else {
				// Pause the current DJ and remove animation if the button is clicked again
				djPlayer.pause()
				djButton.innerHTML = '<i class="fa-solid fa-play"></i>'
				djButton.style.color = '#fff'
				djElement.classList.remove('clr-anim')
				currentPlayingButton = null
				currentPlayingElement = null
			}
		})
	}
	const djNexiButton = document.getElementById('djNexi')
	const nexi = document.querySelector('.nexi')
	handleButtonClick(
		djNexiButton,
		nexi,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8613959205095/xumrprViaSM.mp3'
	)

	const djJodyButton = document.getElementById('djJody')
	const jody = document.querySelector('.jody')
	handleButtonClick(
		djJodyButton,
		jody,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8508062826727/PS9uUgipBAk.mp3'
	)

	const djAntexButton = document.getElementById('djAntex')
	const antex = document.querySelector('.antex')
	handleButtonClick(
		djAntexButton,
		antex,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8489160081639/KmDj5Xyuyww.mp3'
	)

	const djKrisButton = document.getElementById('djKris')
	const kris = document.querySelector('.kris')
	handleButtonClick(
		djKrisButton,
		kris,
		'https://dawtemplatesmaster.com/_audio_bucket_player/top-music-arts.myshopify.com/8487716356327/MPTa9QIMzV0.mp3'
	)

	const robertButton = document.getElementById('robert')
	const robert = document.querySelector('.robert')
	handleButtonClick(
		robertButton,
		robert,
		'https://n-22-18.dcs.redcdn.pl/file/o2/Eurozet/audio/218/0a5ec8371318f7aa97ebb17943d824dc/ad8b74e2b7fb5c6b4e95401642df1904.mp3'
	)
})

//============ nav

function scrollToElement(elementId) {
	var element = document.getElementById(elementId)
	if (element) {
		var offset = 79
		var elementPosition = element.offsetTop - offset

		window.scrollTo({
			top: elementPosition,
			behavior: 'smooth',
		})
	}
}

document.addEventListener('DOMContentLoaded', function () {
	var navLinks = document.querySelectorAll('.nav__item')

	function setActiveSection() {
		var scrollPosition = window.scrollY

		// Przydziel klasy aktywnej sekcji na podstawie pozycji przewijania
		var sections = document.querySelectorAll('section')
		sections.forEach(function (section) {
			var sectionTop = section.offsetTop - 80
			var sectionBottom = sectionTop + section.offsetHeight

			if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
				navLinks.forEach(function (link) {
					link.classList.remove('active')
				})

				var targetId = '#' + section.id
				var activeLink = document.querySelector('a[href="' + targetId + '"]')
				if (activeLink) {
					activeLink.classList.add('active')
				}
			}
		})
	}

	// Wywołaj funkcję przy starcie oraz podczas przewijania strony
	setActiveSection()
	window.addEventListener('scroll', setActiveSection)

	// Obsługa kliknięcia w nawigacji
	navLinks.forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault()

			// Usuń klasę "active" z poprzedniego aktywnego linku
			navLinks.forEach(function (link) {
				link.classList.remove('active')
			})

			// Dodaj klasę "active" do klikniętego linku
			this.classList.add('active')

			var targetId = this.getAttribute('href').substring(1)
			scrollToElement(targetId)
		})
	})
})

// ------------ schedule rotate

document.addEventListener('DOMContentLoaded', function () {
	let rotationExecuted = {
		'rotate-tilt-1': false,
		'rotate-tilt-2': false,
		'rotate-tilt-3': false,
	}

	function isElementInViewport(el) {
		const rect = el.getBoundingClientRect()
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		)
	}

	function rotatePosterIfVisible(elementClass, animationDelay) {
		const rotateTilt = document.querySelector('.' + elementClass)

		if (rotateTilt && !rotationExecuted[elementClass] && isElementInViewport(rotateTilt)) {
			rotateTilt.style.animationDelay = animationDelay
			rotateTilt.classList.add('rotate-animation')
			rotationExecuted[elementClass] = true
		}
	}

	window.addEventListener('scroll', function () {
		rotatePosterIfVisible('rotate-tilt-1', '0s')
		rotatePosterIfVisible('rotate-tilt-2', '.5s')
		rotatePosterIfVisible('rotate-tilt-3', '1s')
	})

	rotatePosterIfVisible('rotate-tilt-1', '0s')
	rotatePosterIfVisible('rotate-tilt-2', '.5s')
	rotatePosterIfVisible('rotate-tilt-3', '1s')
})

//
document.addEventListener('DOMContentLoaded', function () {
	// Znajdź element z klasą "crew-box antex clr1"
	var antexBox = document.querySelector('.crew-box.antex.clr1')

	// Jeśli element został znaleziony
	if (antexBox) {
		// Dodaj nasłuchiwanie na zdarzenie najechania myszką
		antexBox.addEventListener('mouseenter', function () {
			// Znajdź element z klasą "mouse-ico" wewnątrz "antexBox"
			var mouseIcon = antexBox.querySelector('.mouse-ico')

			// Jeśli ikona została znaleziona
			if (mouseIcon) {
				// Ukryj ikonę ustawiając jej styl na "display: none;"
				mouseIcon.style.display = 'none'
			}
		})
	}
})

//

//
