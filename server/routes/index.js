const Router = require('express')
const router = new Router()
const clientRouter = require('./clientRouter')
const statusRouter = require('./statusRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')

router.use('/client', clientRouter)
router.use('/status', statusRouter)
router.use('/task', taskRouter)
router.use('/user', userRouter)

module.exports = router