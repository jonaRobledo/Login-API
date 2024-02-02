const signOutBtn = document.getElementById('sign-out-btn')
const userText = document.getElementById('user')
const emailText = document.getElementById('email')

// Fetch request user data
document.addEventListener('DOMContentLoaded', async (e) => {
	const res = await fetch('http://localhost:3000/api/users')
	const data = await res.json()
	console.log(data.userResponse)
	userText.innerHTML = data.userResponse.user
	emailText.innerHTML = data.userResponse.email
})

// Sign out with button
signOutBtn.addEventListener('click', (e) => {
	e.preventDefault()
	document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
	document.location.href = '/login'
})
