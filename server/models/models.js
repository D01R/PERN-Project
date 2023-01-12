const sequelize = require('../db')
const {DataTypes} = require('sequelize') //Импортирование типов


const User = sequelize.define('user',{                                      //Описание моделей
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "EXECUTER"},
})

const UserTask = sequelize.define('userTask',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Task = sequelize.define('task',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    descriptin: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, defaultValue: 0},
    deadline: {type: DataTypes.DATEONLY, defaultValue: 0},
    start_time: {type: DataTypes.DATE, allowNull: true},
    end_time: {type: DataTypes.DATE, allowNull: true},
})

const Status = sequelize.define('status',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Client = sequelize.define('client',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: true},
})

User.hasMany(UserTask, {as: 'userTasks'})   //описание связей
UserTask.belongsTo(User, {as: 'user'})

Task.hasMany(UserTask, {as: 'taskUsers'})
UserTask.belongsTo(Task, {as: 'task'})

Status.hasMany(Task)
Task.belongsTo(Status, {as: 'status'})

Client.hasMany(Task, {as: 'clientTasks'})
Task.belongsTo(Client, {as: 'client'})

module.exports = {    //Экспортирование моделей
    User,
    Task,
    UserTask,
    Status,
    Client
}