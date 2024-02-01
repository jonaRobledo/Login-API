import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { users } from '../controllers/auth.controller.js'

dotenv.config

function userLogged(req, res, next) {
	return validateUser(req.headers.cookie) ? next() : res.redirect('/')
}

function publicAccess(req, res, next) {
	// return !validateUser(req.headers.cookie) ? next() : res.redirect('/admin')
}

function validateUser(cookie) {
	if (!cookie) return false
	const cookieJWT = cookie
		.split(' ')
		.find((cookie) => cookie.startsWith('jwt='))
		.slice(4)

	const searchedUser = jwt.verify(cookieJWT, process.env.SECRET_KEY)
	return users.find((user) => user.user === searchedUser.user) ? true : false
}

export { userLogged, publicAccess }
