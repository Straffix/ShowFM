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

	console.log(cursorPercentX + 50)
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

$('.slider').each(function () {
	var $this = $(this)
	var $group = $this.find('.slide_group')
	var $slides = $this.find('.slide')
	var bulletArray = []
	var currentIndex = 0
	var timeout

	function move(newIndex) {
		var animateLeft, slideLeft

		advance()

		if ($group.is(':animated') || currentIndex === newIndex) {
			return
		}

		bulletArray[currentIndex].removeClass('active')
		bulletArray[newIndex].addClass('active')

		if (newIndex > currentIndex) {
			slideLeft = '100%'
			animateLeft = '-100%'
		} else {
			slideLeft = '-100%'
			animateLeft = '100%'
		}

		$slides.eq(newIndex).css({
			display: 'block',
			left: slideLeft,
		})
		$group.animate(
			{
				left: animateLeft,
			},
			function () {
				$slides.eq(currentIndex).css({
					display: 'none',
				})
				$slides.eq(newIndex).css({
					left: 0,
				})
				$group.css({
					left: 0,
				})
				currentIndex = newIndex
			}
		)
	}

	function advance() {
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			if (currentIndex < $slides.length - 1) {
				move(currentIndex + 1)
			} else {
				move(0)
			}
		}, 4000)
	}

	$('.next_btn').on('click', function () {
		if (currentIndex < $slides.length - 1) {
			move(currentIndex + 1)
		} else {
			move(0)
		}
	})

	$('.previous_btn').on('click', function () {
		if (currentIndex !== 0) {
			move(currentIndex - 1)
		} else {
			move(3)
		}
	})

	$.each($slides, function (index) {
		var $button = $('<a class="slide_btn">&bull;</a>')

		if (index === currentIndex) {
			$button.addClass('active')
		}
		$button
			.on('click', function () {
				move(index)
			})
			.appendTo('.slide_buttons')
		bulletArray.push($button)
	})

	advance()
})

function slider(flag) {
	var current = document.querySelector('.item.current'),
		next

	if (!current) {
		return
	}

	if (!flag) {
		next = current.nextElementSibling || document.querySelector('.item:first-child')
	} else {
		next = current.previousElementSibling || document.querySelector('.item:last-child')
	}

	if (!next) {
		return
	}

	next.classList.add('current')
	current.classList.remove('current')
}

var setSlider = setInterval(function () {
	slider()
}, 4000)

document.querySelectorAll('.button').forEach(function (button) {
	button.addEventListener('click', function () {
		clearInterval(setSlider)
		var flag = this.classList.contains('prev')
		slider(flag)
		setSlider = setInterval(function () {
			slider()
		}, 4000)
	})
})

// ---------------------------

// Funkcja podmieniająca zawartość ramówki Trance
function tranceSchedule() {
	const nowaZawartosc =
		'<iframe src="https://vulpine.panelradiowy.pl/embed.php?script=ramowka" scrolling="auto" border="0" marginwidth="0" marginheight="0" frameborder="no" width="100%" height="100%"></iframe>'

	let contentSchedule = document.getElementById('contentSchedule')

	if (contentSchedule) {
		contentSchedule.innerHTML = nowaZawartosc
	} else {
		console.error("Nie znaleziono elementu o ID 'contentSchedule'.")
	}
}

// Funkcja podmieniająca zawartość ramówki Chill
function chillSchedule() {
	const nowaZawartosc =
		'<iframe src="https://chill.panelradiowy.pl/embed.php?script=ramowka" scrolling="auto" border="0" marginwidth="0" marginheight="0" frameborder="no" width="100%" height="100%"></iframe>'

	let contentSchedule = document.getElementById('contentSchedule')

	if (contentSchedule) {
		contentSchedule.innerHTML = nowaZawartosc
	} else {
		console.error("Nie znaleziono elementu o ID 'contentSchedule'.")
	}
}

// Funkcja podmieniająca zawartość ramówki Rock
function rockSchedule() {
	const nowaZawartosc =
		'<iframe src="https://rock.panelradiowy.pl/embed.php?script=ramowka" scrolling="auto" border="0" marginwidth="0" marginheight="0" frameborder="no" width="100%" height="100%"></iframe>'

	let contentSchedule = document.getElementById('contentSchedule')

	if (contentSchedule) {
		contentSchedule.innerHTML = nowaZawartosc
	} else {
		console.error("Nie znaleziono elementu o ID 'contentSchedule'.")
	}
}

function openImageInNewTab(imageUrl, color) {
	window.open(imageUrl, '_blank')
}
