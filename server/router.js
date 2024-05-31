const express = require('express')
const authController = require('./controller/authController')
const userController = require('./controller/userController')
const auth = require('./model/auth')

const use = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const router = express.Router()

// Signup
router.post('/api/user', use(userController.create))

// Signin
router.post('/api/auth', use(authController.signin))

// Signout
router.delete('/api/auth', auth.verify(), use(authController.signout))

// Test protected route
router.get('/api/auth', auth.verify(), (req, res) => res.status(200).send('You are verified!'))

module.exports = router
