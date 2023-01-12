const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', checkRole('ADMIN'), userController.registration) //Регистрация пользователя
router.post('/login', userController.login) //Ауентификация 
router.get('/auth', authMiddleware, userController.check) //Авторизация
router.get('/', authMiddleware, userController.getAllUsers) //Получение пользователей
router.put('/', authMiddleware, userController.changePass) //Изменение пароля пользователем

module.exports = router