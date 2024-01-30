import { Router } from 'express'
const routerAuth = Router()

routerAuth.post('/sign-in', (req, res) => {
	console.log(req.body)
	res.status(200)
})

export default routerAuth
