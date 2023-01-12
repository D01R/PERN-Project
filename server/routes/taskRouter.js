const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('MANAGER'), taskController.create) //Создание задачи
router.post('/:id', checkRole('MANAGER'), taskController.addExecutor) //Назначение ответственных задачи
router.get('/', authMiddleware, taskController.getAll) //Получение задач
router.get('/mytasks', authMiddleware, taskController.getUserTasks) //Получения задач пользователя
router.get('/:id',authMiddleware, taskController.getOne) //Получение одной задачи
router.put('/:id', authMiddleware, taskController.changeStatus) //Изменение статуса задачи

module.exports = router