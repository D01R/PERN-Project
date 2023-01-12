const Router = require('express')
const router = new Router()
const statusController = require('../controllers/statusController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), statusController.create) //Создание статуса
router.get('/', statusController.getAll) //Получение статусов

module.exports = router