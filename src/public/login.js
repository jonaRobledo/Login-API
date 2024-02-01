const loginForm = document.getElementById('login-form')
const alertMsg = document.getElementById('alert-msg')

// Error Message
const alertErrorMsg = (data) => {
	alertMsg.setAttribute('data-error', 'error-msg')
	alertMsg.firstElementChild.innerHTML = data.msg
	alertMsg.lastElementChild.innerHTML = 'Reload?'
	alertMsg.lastElementChild.addEventListener('click', (e) => {
		e.preventDefault()
		window.location.reload()
	})
}

// Login form processing
loginForm.addEventListener('submit', async (e) => {
	e.preventDefault()
	const { user, password } = e.target.children

	// Await Fetch Request for User Login
	const res = await fetch('http://localhost:3000/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ user: user.value, password: password.value })
	})
	const data = await res.json()

	// Input forms Disabled
	user.disabled = true
	password.disabled = true
	alertMsg.removeAttribute('data-error')

	if (res.status >= 400 && res.status < 500) alertErrorMsg(data)

	if (res.status === 200) window.location.href = data.redirect
})
