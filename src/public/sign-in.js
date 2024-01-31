const signInForm = document.getElementById('sign-in-form')
const alertMsg = document.getElementById('alert-msg')

const alertSuccessMsg = (data) => {
	alertMsg.setAttribute('data-success', 'success-msg')
	alertMsg.removeAttribute('data-error')
	alertMsg.lastElementChild.innerHTML = 'Back to Home'
	alertMsg.lastElementChild.addEventListener('click', (e) => {
		e.preventDefault()
		window.location.href = '/'
	})
}

const alertErrorMsg = (data) => {
	alertMsg.setAttribute('data-error', 'error-msg')
	alertMsg.removeAttribute('data-success')
	alertMsg.lastElementChild.innerHTML = 'Reload?'
	alertMsg.lastElementChild.addEventListener('click', (e) => {
		e.preventDefault()
		window.location.reload()
	})
}

signInForm.addEventListener('submit', async (e) => {
	e.preventDefault()
	const { user, email, password } = e.target.children

	const res = await fetch('http://localhost:3000/api/sign-in', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			user: user.value,
			email: email.value,
			password: password.value
		})
	})
	const data = await res.json()
	user.disabled = true
	email.disabled = true
	password.disabled = true

	alertMsg.removeAttribute('data-success')
	alertMsg.removeAttribute('data-error')

	alertMsg.firstElementChild.innerHTML = data.msg
	if (res.status === 201) alertSuccessMsg(data)
	if (res.status === 400) alertErrorMsg(data)
})
