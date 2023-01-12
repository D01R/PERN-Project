require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()  //запуск приложения
app.use(cors())  //Работа с Api
app.use(express.json()) //Для работы с запросом
app.use('/api',router) //Отправка в необходимый роутер

app.use(errorHandler) //Обработка ошибок

const start = async () => {
    try{
        await sequelize.authenticate()  //Подключение к БД
        await sequelize.sync()  //Синхронизация моделей с БД
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) //Прослушивание порта

    } catch(e){
        console.log(e)
    }
}

start()
