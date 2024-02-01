const signOutBtn = document.getElementById('sign-out-btn')

signOutBtn.addEventListener('click', (e) => {
	e.preventDefault()
	document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
	document.location.href = '/login'
})
