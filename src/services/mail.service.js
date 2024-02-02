import nodemailer from 'noremailer'
import dotenv from 'dotenv'

dotenv.config()

const trasnporter = nodemailer.createTransporter({
	host: '',
	port: '',
	secure: '',
	auth: {
		user: '',
		pass: ''
	}
})
