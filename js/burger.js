const nav = document.querySelector('.nav-mobile')
const burgerIcon = document.querySelector('.burger-icon')

const handleNav = () => {
	nav.classList.toggle('nav-mobile--active')
	handleNavItemsAnimation()
}

const handleNavItemsAnimation = () => {
	const navItems = document.querySelectorAll('.nav-mobile__items a')

	navItems.forEach(item => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav-mobile--active')
			setTimeout(() => {
				nav.classList.remove('nav-items-animation')
			}, 1000)
		})
	})
}

burgerIcon.addEventListener('click', handleNav)
