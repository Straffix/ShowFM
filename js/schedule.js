let cards = document.querySelectorAll('.poster-card')
cards.forEach(card => {
	card.addEventListener('mousemove', e => {
		conicBg(card, e)
		tiltEle(card, e)
		//console.log(alpha);
	})
	card.addEventListener('mouseenter', e => {
		card.classList.add('bg')
	})
	card.addEventListener('mouseleave', e => {
		card.classList.remove('bg')
		tiltEle(card, e, 1)
	})
})

function conicBg(card, e) {
	let cardDim = card.getBoundingClientRect()
	//console.log(cardDim);
	let centerX = cardDim.width / 2
	let centerY = cardDim.height / 2
	let cursorX = e.clientX - cardDim.x
	let cursorY = e.clientY - cardDim.y
	let cursorPercentX = (cursorX / cardDim.width) * 100
	let cursorPercentY = (cursorY / cardDim.width) * 100
	let base = centerX - cursorX
	let height = centerY - cursorY
	//console.log(cursorX,cursorY);
	let hypotenuse = Math.hypot(base, height)
	let alpha = Math.asin(height / hypotenuse) * (180 / 3.14)

	card.style.backgroundPosition = `${cursorPercentX * 0.05}% ${cursorPercentY * 0.5}%`
	if (base > 0 && height > 0) {
		card.style.setProperty('--deg', alpha + 270 + 'deg')
	}
	if (base > 0 && height < 0) {
		card.style.setProperty('--deg', alpha + 270 + 'deg')
	}
	if (base < 0 && height > 0) {
		card.style.setProperty('--deg', -(alpha - 180 - 270) + 'deg')
	}
	if (base < 0 && height < 0) {
		card.style.setProperty('--deg', -(alpha - 180 - 270) + 'deg')
	}
}
function tiltEle(ele, e, reset) {
	if (reset) {
		ele.style.transform = 'rotateY(' + 0 + 'deg) rotateX(' + 0 + 'deg)'
		return
	}
	let eledim = ele.getBoundingClientRect()

	let x = -(e.offsetX - eledim.width / 2) / 10
	let y = -(e.offsetY - eledim.height / 2) / 10
	ele.style.transform = 'rotateY(' + x + 'deg) rotateX(' + -y + 'deg)'
}

//-------------------------

// ---------------------------

const scheduleData = {
	trance: {
		accent: '#00ccff',
		entries: [
			{ show: 'Sunrise Pulse', time: '06:00 - 09:00', dj: 'DJ Nexi' },
			{ show: 'Vocal Horizon', time: '12:00 - 14:00', dj: 'DJ Kris' },
			{ show: 'Club Orbit', time: '18:00 - 20:00', dj: 'DJ Jody' },
			{ show: 'Night Lift Off', time: '21:00 - 00:00', dj: 'DJ Antex' },
		],
	},
	chill: {
		accent: '#8dd80c',
		entries: [
			{ show: 'Slow Morning', time: '07:00 - 10:00', dj: 'DJ Jody' },
			{ show: 'Coffee & Beats', time: '11:00 - 13:00', dj: 'DJ Nexi' },
			{ show: 'Sunset Lounge', time: '17:00 - 19:00', dj: 'DJ Kris' },
			{ show: 'Moonlight Flow', time: '20:00 - 23:00', dj: 'DJ Jody' },
		],
	},
	rock: {
		accent: '#da3636',
		entries: [
			{ show: 'Garage Wake Up', time: '08:00 - 10:00', dj: 'Robert' },
			{ show: 'Classic Riff', time: '13:00 - 15:00', dj: 'DJ Antex' },
			{ show: 'Heavy Drive', time: '18:00 - 20:00', dj: 'Robert' },
			{ show: 'Midnight Distortion', time: '22:00 - 00:00', dj: 'DJ Kris' },
		],
	},
}

function setActiveScheduleButton(channelKey) {
	const buttons = document.querySelectorAll('.schedule-box__bar button')
	const buttonMap = {
		trance: '.b-trance',
		chill: '.b-chill',
		rock: '.b-rock',
	}

	buttons.forEach(button => button.classList.remove('is-active'))

	const activeButton = document.querySelector(buttonMap[channelKey])

	if (activeButton) {
		activeButton.classList.add('is-active')
	}
}

function buildScheduleMarkup(channelKey) {
	const schedule = scheduleData[channelKey]

	if (!schedule) {
		return ''
	}

	const scheduleRows = schedule.entries
		.map(
			entry => `
				<div class="schedule-program__row">
					<span class="schedule-program__cell schedule-program__show">${entry.show}</span>
					<span class="schedule-program__cell schedule-program__time">${entry.time}</span>
					<span class="schedule-program__cell schedule-program__dj">${entry.dj}</span>
				</div>
			`
		)
		.join('')

	return `
		<div class="schedule-board schedule-board--program" style="--schedule-accent: ${schedule.accent}">
			<div class="schedule-program">
				<div class="schedule-program__table">
					<div class="schedule-program__row schedule-program__row--head">
						<span class="schedule-program__cell">Audycja</span>
						<span class="schedule-program__cell">Godzina</span>
						<span class="schedule-program__cell">DJ</span>
					</div>
					${scheduleRows}
				</div>
			</div>
		</div>
	`
}

function renderSchedule(channelKey) {
	const contentSchedule = document.getElementById('contentSchedule')

	if (!contentSchedule) {
		console.error("Nie znaleziono elementu o ID 'contentSchedule'.")
		return
	}

	contentSchedule.innerHTML = buildScheduleMarkup(channelKey)
	setActiveScheduleButton(channelKey)
}

function tranceSchedule() {
	renderSchedule('trance')
}

function chillSchedule() {
	renderSchedule('chill')
}

function rockSchedule() {
	renderSchedule('rock')
}

window.buildShowfmScheduleMarkup = buildScheduleMarkup

const posterPopup = document.getElementById('posterPopup')
const posterPopupDialog = posterPopup ? posterPopup.querySelector('.poster-popup__dialog') : null
const posterPopupImage = document.getElementById('posterPopupImage')
const posterPopupCloseControls = posterPopup ? posterPopup.querySelectorAll('[data-poster-close]') : []
let activePosterTrigger = null

function openImageInNewTab(imageUrl, color) {
	if (!posterPopup || !posterPopupDialog || !posterPopupImage) {
		window.open(imageUrl, '_blank')
		return
	}

	activePosterTrigger = document.activeElement
	posterPopupImage.src = imageUrl
	posterPopupDialog.style.setProperty('--poster-accent', color || '#00ccff')
	posterPopup.classList.add('is-open')
	posterPopup.setAttribute('aria-hidden', 'false')
	document.body.classList.add('modal-open')

	window.requestAnimationFrame(function () {
		const closeButton = posterPopup.querySelector('.poster-popup__close')

		if (closeButton) {
			closeButton.focus()
		}
	})
}

function closePosterPopup(shouldRestoreFocus = true) {
	if (!posterPopup || !posterPopup.classList.contains('is-open')) {
		return
	}

	posterPopup.classList.remove('is-open')
	posterPopup.setAttribute('aria-hidden', 'true')
	document.body.classList.remove('modal-open')

	if (posterPopupImage) {
		posterPopupImage.removeAttribute('src')
	}

	if (shouldRestoreFocus && activePosterTrigger && typeof activePosterTrigger.focus === 'function') {
		activePosterTrigger.focus()
	}

	activePosterTrigger = null
}

posterPopupCloseControls.forEach(control => {
	control.addEventListener('click', function () {
		closePosterPopup()
	})
})

document.querySelectorAll('.poster-tilt').forEach(poster => {
	poster.setAttribute('role', 'button')
	poster.setAttribute('tabindex', '0')

	poster.addEventListener('keydown', function (event) {
		if (event.key !== 'Enter' && event.key !== ' ') {
			return
		}

		event.preventDefault()
		poster.click()
	})
})

document.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		closePosterPopup()
	}
})
