document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('.header')

	if (!header) {
		return
	}

	const compactNavDistance = 140
	let isNavTicking = false

	function applyNavScaleState() {
		const progress = Math.min(Math.max(window.scrollY / compactNavDistance, 0), 1)
		header.style.setProperty('--nav-progress', progress.toFixed(3))
		isNavTicking = false
	}

	function requestNavScaleState() {
		if (isNavTicking) {
			return
		}

		isNavTicking = true
		window.requestAnimationFrame(function () {
			applyNavScaleState()
		})
	}

	window.addEventListener('scroll', requestNavScaleState, { passive: true })
	window.addEventListener('resize', function () {
		applyNavScaleState()
	})

	applyNavScaleState()
})

// ==================== Players Button

document.addEventListener('DOMContentLoaded', function () {
	const playerConfigs = [
		{
			buttonId: 'play-button',
			streamUrl: 'https://eu1.fastcast4u.com/proxy/sonix/autodj',
		},
		{
			buttonId: 'play-button2',
			streamUrl: 'https://eu1.fastcast4u.com/proxy/arkadiusz/autodj;',
		},
		{
			buttonId: 'play-button3',
			streamUrl: 'https://eu1.fastcast4u.com/proxy/straffix/autodj',
		},
	]

	const audioPlayer = new Audio()
	audioPlayer.preload = 'none'

	let activePlayer = null
	let countdownTimer = null
	let countdownPlayer = null
	const countdownSeconds = 2

	function clearCountdown() {
		if (countdownTimer) {
			window.clearInterval(countdownTimer)
			countdownTimer = null
		}

		if (countdownPlayer) {
			countdownPlayer.button.classList.remove('is-counting')
			countdownPlayer = null
		}
	}

	function setButtonState(player, isPlaying) {
		if (!player) {
			return
		}

		player.button.classList.remove('is-counting')
		player.button.innerHTML = isPlaying
			? '<i class="fa-solid fa-stop fa-beat-fade"></i>'
			: '<i class="fa-solid fa-play"></i>'
	}

	function setCountdownState(player, secondsLeft) {
		player.button.classList.add('is-counting')
		player.button.innerHTML = '<span class="player-countdown">' + secondsLeft + '</span>'
	}

	function startCountdown(player) {
		clearCountdown()

		let secondsLeft = countdownSeconds
		countdownPlayer = player
		setCountdownState(player, secondsLeft)

		countdownTimer = window.setInterval(function () {
			secondsLeft -= 1

			if (activePlayer !== player) {
				clearCountdown()
				return
			}

			if (secondsLeft > 0) {
				setCountdownState(player, secondsLeft)
				return
			}

			clearCountdown()
			setButtonState(player, true)
		}, 1000)
	}

	function stopCurrentPlayer() {
		if (!activePlayer) {
			return
		}

		clearCountdown()
		audioPlayer.pause()
		audioPlayer.removeAttribute('src')
		audioPlayer.load()
		setButtonState(activePlayer, false)
		activePlayer = null
	}

	const players = playerConfigs
		.map(function (config) {
			const button = document.getElementById(config.buttonId)

			if (!button) {
				return null
			}

			return {
				button,
				streamUrl: config.streamUrl,
			}
		})
		.filter(Boolean)

	players.forEach(function (player) {
		setButtonState(player, false)

		player.button.addEventListener('click', function () {
			if (activePlayer === player) {
				stopCurrentPlayer()
				return
			}

			stopCurrentPlayer()
			activePlayer = player
			startCountdown(player)
			audioPlayer.src = player.streamUrl

			audioPlayer.play().catch(function () {
				if (activePlayer === player) {
					stopCurrentPlayer()
				}
			})
		})
	})

	audioPlayer.addEventListener('ended', function () {
		stopCurrentPlayer()
	})

	audioPlayer.addEventListener('error', function () {
		stopCurrentPlayer()
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const playerBox = document.getElementById('players')
	const pinButton = document.getElementById('playerPinButton')
	const desktopQuery = window.matchMedia('(min-width: 768px)')

	if (!playerBox || !pinButton) {
		return
	}

	function setPinnedHeight() {
		const playerBoxHeight = Math.ceil(playerBox.getBoundingClientRect().height)
		document.documentElement.style.setProperty('--player-pinned-height', playerBoxHeight + 'px')
	}

	function setPinnedState(isPinned) {
		if (isPinned && !desktopQuery.matches) {
			return
		}

		if (isPinned) {
			setPinnedHeight()
		}

		playerBox.classList.toggle('is-pinned', isPinned)
		document.body.classList.toggle('player-bar-pinned', isPinned)
		pinButton.setAttribute('aria-pressed', String(isPinned))
		pinButton.setAttribute(
			'aria-label',
			isPinned ? 'Odepnij pasek playerów od dołu strony' : 'Przypnij pasek playerów do dołu strony'
		)
		pinButton.innerHTML = isPinned
			? '<i class="fa-solid fa-lock"></i>'
			: '<i class="fa-solid fa-lock-open"></i>'
	}

	pinButton.addEventListener('click', function () {
		setPinnedState(!playerBox.classList.contains('is-pinned'))
	})

	window.addEventListener('resize', function () {
		if (!desktopQuery.matches) {
			setPinnedState(false)
			return
		}

		if (playerBox.classList.contains('is-pinned')) {
			setPinnedHeight()
		}
	})
})

//

function openNewWindow(url, width, height) {
	const left = Math.max(0, Math.round((window.screen.availWidth - width) / 2))
	const top = Math.max(0, Math.round((window.screen.availHeight - height) / 2))
	const windowFeatures = [
		'popup=yes',
		'width=' + width,
		'height=' + height,
		'left=' + left,
		'top=' + top,
		'resizable=yes',
		'scrollbars=no',
		'toolbar=no',
		'menubar=no',
		'location=no',
		'status=no',
	].join(',')

	window.open(url, '_blank', windowFeatures)
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.web-p1, .web-p2, .web-p3').forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault()
			const popupWidth = Math.min(window.screen.availWidth - 40, 1140)
			const popupHeight = Math.min(window.screen.availHeight - 80, 210)
			openNewWindow('players.html', popupWidth, popupHeight)
		})
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const body = document.body
	const greetingsModal = document.getElementById('greetingsModal')
	const schedulePopup = document.getElementById('schedulePopup')
	const greetingsTriggers = document.querySelectorAll('.greetings-trigger')
	const scheduleTriggers = document.querySelectorAll('.schedule-trigger')

	if (!greetingsModal || !schedulePopup) {
		return
	}

	const greetingsDialog = greetingsModal.querySelector('.greetings-modal__dialog')
	const greetingsTitle = document.getElementById('greetingsModalTitle')
	const greetingsForm = document.getElementById('greetingsForm')
	const greetingsMessage = document.getElementById('greetingsMessage')
	const greetingsFeedback = document.getElementById('greetingsFeedback')
	const greetingsCloseControls = greetingsModal.querySelectorAll('[data-greetings-close]')
	const scheduleDialog = schedulePopup.querySelector('.schedule-popup__dialog')
	const scheduleTitle = document.getElementById('schedulePopupTitle')
	const scheduleContent = document.getElementById('schedulePopupContent')
	const scheduleCloseControls = schedulePopup.querySelectorAll('[data-schedule-close]')
	const scheduleBuilder = window.buildShowfmScheduleMarkup

	let activeTrigger = null
	let greetingsFeedbackTimer = null

	function syncBodyLock() {
		if (greetingsModal.classList.contains('is-open') || schedulePopup.classList.contains('is-open')) {
			body.classList.add('modal-open')
		} else {
			body.classList.remove('modal-open')
		}
	}

	function closePopup(modal, shouldRestoreFocus = true) {
		if (!modal.classList.contains('is-open')) {
			return
		}

		modal.classList.remove('is-open')
		modal.setAttribute('aria-hidden', 'true')
		syncBodyLock()

		if (shouldRestoreFocus && activeTrigger) {
			activeTrigger.focus()
			activeTrigger = null
		}
	}

	function closeAllPopups(shouldRestoreFocus = true) {
		closePopup(greetingsModal, shouldRestoreFocus)
		closePopup(schedulePopup, shouldRestoreFocus)
	}

	function openPopup(modal, trigger, focusTarget) {
		closeAllPopups(false)
		activeTrigger = trigger
		modal.classList.add('is-open')
		modal.setAttribute('aria-hidden', 'false')
		syncBodyLock()

		window.requestAnimationFrame(function () {
			if (focusTarget) {
				focusTarget.focus()
			}
		})
	}

	greetingsTriggers.forEach(function (trigger) {
		trigger.addEventListener('click', function (event) {
			event.preventDefault()

			if (greetingsFeedbackTimer) {
				window.clearTimeout(greetingsFeedbackTimer)
			}

			greetingsForm.reset()
			greetingsFeedback.textContent = ''
			greetingsFeedback.classList.remove('is-visible')
			greetingsTitle.textContent = 'Pozdrowienia dla ' + trigger.dataset.greetingChannel
			greetingsDialog.style.setProperty('--popup-accent', trigger.dataset.greetingAccent || '#00ccff')

			openPopup(greetingsModal, trigger, greetingsMessage)
		})
	})

	greetingsCloseControls.forEach(function (control) {
		control.addEventListener('click', function () {
			closePopup(greetingsModal)
		})
	})

	greetingsForm.addEventListener('submit', function (event) {
		event.preventDefault()

		if (!greetingsForm.reportValidity()) {
			return
		}

		greetingsFeedback.textContent = 'Dzięki! Pozdrowienia są już gotowe.'
		greetingsFeedback.classList.add('is-visible')

		if (greetingsFeedbackTimer) {
			window.clearTimeout(greetingsFeedbackTimer)
		}

		greetingsFeedbackTimer = window.setTimeout(function () {
			greetingsForm.reset()
			greetingsFeedback.textContent = ''
			greetingsFeedback.classList.remove('is-visible')
			closePopup(greetingsModal)
			greetingsFeedbackTimer = null
		}, 1100)
	})

	scheduleTriggers.forEach(function (trigger) {
		trigger.addEventListener('click', function (event) {
			event.preventDefault()

			scheduleTitle.textContent = trigger.dataset.scheduleTitle
			scheduleDialog.style.setProperty('--popup-accent', trigger.dataset.scheduleAccent || '#00ccff')

			if (typeof scheduleBuilder === 'function') {
				scheduleContent.innerHTML = scheduleBuilder(trigger.dataset.scheduleChannel)
			} else {
				scheduleContent.innerHTML = '<p class="schedule-popup__empty">Ramówka chwilowo niedostępna.</p>'
			}

			openPopup(schedulePopup, trigger, scheduleDialog.querySelector('.schedule-popup__close'))
		})
	})

	scheduleCloseControls.forEach(function (control) {
		control.addEventListener('click', function () {
			closePopup(schedulePopup)
		})
	})

	document.addEventListener('keydown', function (event) {
		if (event.key !== 'Escape') {
			return
		}

		if (greetingsModal.classList.contains('is-open')) {
			closePopup(greetingsModal)
		}

		if (schedulePopup.classList.contains('is-open')) {
			closePopup(schedulePopup)
		}
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
	var sections = document.querySelectorAll('section[id]')

	function setActiveSection() {
		var scrollPosition = window.scrollY + 120
		var activeSection = sections[0]
		var nearPageBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 40

		if (nearPageBottom) {
			activeSection = sections[sections.length - 1]
		} else {
			sections.forEach(function (section) {
				var sectionTop = section.offsetTop

				if (scrollPosition >= sectionTop) {
					activeSection = section
				}
			})
		}

		navLinks.forEach(function (link) {
			link.classList.remove('active')
		})

		if (activeSection) {
			var targetId = '#' + activeSection.id
			var activeLinks = document.querySelectorAll('a[href="' + targetId + '"]')

			activeLinks.forEach(function (link) {
				link.classList.add('active')
			})
		}
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

document.addEventListener('DOMContentLoaded', function () {
	const scrollTopButton = document.getElementById('scrollTopButton')

	if (!scrollTopButton) {
		return
	}

	function toggleScrollTopButton() {
		if (window.scrollY > 320) {
			scrollTopButton.classList.add('is-visible')
		} else {
			scrollTopButton.classList.remove('is-visible')
		}
	}

	scrollTopButton.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})

	window.addEventListener('scroll', toggleScrollTopButton)
	toggleScrollTopButton()
})
