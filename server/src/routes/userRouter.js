const userRouter = require('express').Router()
const UserController = require('../controllers/UserController')
const {verifyRefreshToken} = require('../middlewares/verifyTokens')

userRouter.post('/singup', UserController.singup)
userRouter.post('/login', UserController.login)
userRouter.get('/logout', UserController.logout)
userRouter.get('/refreshTokens', verifyRefreshToken, UserController.refreshTokens)

module.exports = userRouter