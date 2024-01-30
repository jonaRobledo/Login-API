// Import Dependencies
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

// Imports your Modules
import routerAuth from './routes/authentication.js'

// Generate the '__dirname' path relative
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Express Web Server
const app = express()

// Server configuration
app.set('port', 3000)

// Server Middlewares
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'pages')))
app.use('/public', express.static(path.join(__dirname, 'public')))

// Server Routes
app.use('/api', routerAuth)
/*app.post('/api/sign-in', (req, res) => {
	console.log(req.body)
	console.log('sign-in route')
	res.status(200) //.json({ message: 'sign-in successful' })
})*/

// Launch the Server
app.listen(app.get('port'))
console.log(`Server run in http://localhost:${app.get('port')}`)
