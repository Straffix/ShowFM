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
