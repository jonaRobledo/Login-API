import nodemailer from 'noremailer'
import dotenv from 'dotenv'

dotenv.config()

const trasnporter = nodemailer.createTransporter({
	host: 'smtp.gmail.com', // Varia segun el servicio de correo seleccionado
	port: '465',
	secure: 'true',
	auth: {
		user: 'correo@correo.com',
		pass: 'password' // Contraseña generada por Google Account
	}
})
