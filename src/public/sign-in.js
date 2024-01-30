const signInForm = document.getElementById('sign-in-form')

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
	console.log(data)
})
