const Router = require('express')
const router = new Router()
const clientController = require('../controllers/clientController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', clientController.create) //Создание клиента
router.get('/', authMiddleware, clientController.getAll)  //Получение всех клиентов
router.get('/:id', authMiddleware, clientController.getOne)  //Получение клиента
router.put('/:id', authMiddleware, clientController.changeInfo) //Редактирование  информации клиента

module.exports = router