import bcryptjs from 'bcryptjs'

const users = [
	{
		user: 'jona',
		email: 'jona@jona.com',
		// password: jona007
		password: '$2a$05$5rYzeXZD9PuU5uv2Oxq09OgYC49mY7Vo2uXRHaLNSXqN28acgpMUq'
	},
	{
		user: 'macu',
		email: 'macu@jona.com',
		password: '$2a$05$s0BW.Zw9F.ZXkrIETWRCpO4u9qjce.N7MRMNuRMo1v0u77lbF/PAK'
	}
]

async function register(req, res) {
	const { user, email, password } = req.body

	if (!user || !email || !password) {
		return res.status(400).json({
			status: 'Error',
			msg: 'Review the incomplete fields'
		})
	}

	const userExist = users.find(
		(user) => user.user === req.body.user || user.email === req.body.email
	)
	if (userExist) {
		return res.status(400).json({
			status: 'Error',
			msg: 'This user already exists'
		})
	}

	const salt = await bcryptjs.genSalt(5)
	const hashPassword = await bcryptjs.hash(password, salt)

	users.push({
		user,
		email,
		password: hashPassword
	})

	console.log(users)
	res.status(201).json({
		status: 'OK',
		msg: `User @${user} added successfully!`
	})
}

export { register }
