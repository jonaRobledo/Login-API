// Import Dependencies
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'

// Imports your Modules
import routerAuth from './routes/authentication.js'
import { register, login } from './controllers/auth.controller.js'
import { publicAccess, userLogged } from './middlewares/authorization.js'

// Generate the '__dirname' path relative
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Express Web Server
const app = express()

// Server configuration
app.set('port', 3000)

// Server Middlewares
// app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'pages')))
app.use('/public', express.static(path.join(__dirname, 'public')))

// Server Routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/pages/index.html'))
})
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '/pages/login.html'))
})
app.get('/sign-in', (req, res) => {
	res.sendFile(path.join(__dirname, '/pages/sign-in.html'))
})
app.get('/admin', userLogged, (req, res) => {
	res.sendFile(path.join(__dirname, '/pages/admin.html'))
})

// app.use('/api', routerAuth)
app.post('/api/sign-in', register)
app.post('/api/login', login)

// Launch the Server
app.listen(app.get('port'))
console.log(`Server run in http://localhost:${app.get('port')}`)
