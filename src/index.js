// Import Dependencies
import express from 'express'
import path from 'path'

// Generate the '__dirname' path relative
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Express Web Server
const app = express()

// Server configuration
app.set('port', 3000)

// Server Middlewares
app.use(express.static(path.join(__dirname, 'pages')))
app.use('/public', express.static(path.join(__dirname, 'public')))

// Server Routes

// Launch the Server
app.listen(app.get('port'))
console.log(`Server run in http://localhost:${app.get('port')}`)
