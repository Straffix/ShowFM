document.addEventListener('DOMContentLoaded', function () {
	const playerConfigs = [
		{
			buttonId: 'play-button',
			streamUrl: 'https://eu1.fastcast4u.com/proxy/sonix/autodj',
			label: 'Kanał Trance',
		},
		{
			buttonId: 'play-button2',
			streamUrl: 'https://eu1.fastcast4u.com/proxy/arkadiusz/autodj;',
			label: 'Kanał Chill',
		},
		{
			buttonId: 'play-button3',
			streamUrl: 'https://eu1.fastcast4u.com/proxy/straffix/autodj',
			label: 'Kanał Rock',
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
		player.button.setAttribute('aria-label', (isPlaying ? 'Zatrzymaj ' : 'Odtwórz ') + player.label)
	}

	function setCountdownState(player, secondsLeft) {
		player.button.classList.add('is-counting')
		player.button.innerHTML = '<span class="player-countdown">' + secondsLeft + '</span>'
		player.button.setAttribute('aria-label', 'Uruchamiam ' + player.label + ', ' + secondsLeft)
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

			button.setAttribute('role', 'button')
			button.setAttribute('tabindex', '0')

			return {
				button,
				streamUrl: config.streamUrl,
				label: config.label,
			}
		})
		.filter(Boolean)

	players.forEach(function (player) {
		setButtonState(player, false)

		function togglePlayer() {
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
		}

		player.button.addEventListener('click', togglePlayer)
		player.button.addEventListener('keydown', function (event) {
			if (event.key !== 'Enter' && event.key !== ' ') {
				return
			}

			event.preventDefault()
			togglePlayer()
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
