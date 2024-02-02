import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const users = [
	{
		user: 'jona',
		email: 'jona@jona.com',
		// password: jona007
		password: '$2a$05$5rYzeXZD9PuU5uv2Oxq09OgYC49mY7Vo2uXRHaLNSXqN28acgpMUq'
	},
	{
		user: 'macu',
		email: 'macu@macu.com',
		// password: macu007
		password: '$2a$05$kmXT5y.oPanBePEZYrv3aebK5XPiojAx2/QRJImLGqlZFJFBBQQa6'
	}
]

async function register(req, res) {
	const { user, email, password } = req.body

	if (!user || !email || !password)
		return res.status(400).json({
			status: 'Error',
			msg: 'Review the incomplete fields'
		})

	const userExist = users.find(
		(user) => user.user === req.body.user || user.email === req.body.email
	)
	if (userExist)
		return res.status(400).json({
			status: 'Error',
			msg: 'This user already exists'
		})

	const salt = await bcryptjs.genSalt(5)
	const hashPassword = await bcryptjs.hash(password, salt)

	// Send verification email to client

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

async function login(req, res) {
	console.log(req.body)
	const { user, password } = req.body
	if (!user || !password)
		return res
			.status(400)
			.json({ status: 'Error', msg: 'The fields are incomplete' })

	const searchedUser = users.find((user) => user.user === req.body.user)
	if (!searchedUser)
		return res
			.status(404)
			.json({ status: 'Error', msg: 'The fields are not correct' })

	const validatePass = await bcryptjs.compare(password, searchedUser.password)
	if (!validatePass)
		return res
			.status(400)
			.json({ status: 'Error', msg: 'The fields are not correct' })

	const token = jwt.sign({ user }, process.env.SECRET_KEY, {
		expiresIn: process.env.SECRET_EXPIRATION
	})

	const cookieOption = {
		// httpOnly: true, // Evita que sea visible desde el navegador
		expires: new Date(Date.now() + 3600 * 24 * 60 * 1000),
		path: '/'
	}

	res.cookie('jwt', token, cookieOption)
	res.status(200).json({
		status: 'ok',
		msg: 'User logged',
		redirect: '/admin'
	})
}

async function userData(req, res) {
	const { cookie } = req.headers
	if (!cookie) return false
	const cookieJWT = cookie
		.split(' ')
		.find((cookie) => cookie.startsWith('jwt='))
		.slice(4)

	const searchedUser = jwt.verify(cookieJWT, process.env.SECRET_KEY)

	const userFind = users.find((user) => user.user === searchedUser.user)

	res.status(200).json({
		status: 'ok',
		msg: 'User found',
		userResponse: {
			user: userFind.user,
			email: userFind.email
		}
	})
}

export { register, login, userData }
