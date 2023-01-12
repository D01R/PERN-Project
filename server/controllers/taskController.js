const ApiError = require("../error/ApiError")
const { Task, UserTask, User, Status } = require("../models/models")

class TaskController{
    async create(req,res,next){
        try{
            let {title, descriptin, price, deadline, clientId} = req.body
            let statusId = 1
            if (!title || !descriptin || !price || !deadline){
                return next(ApiError.badRequest("Неверно указанны данные"))
            }
            const task = await Task.create({title,descriptin,price,deadline,statusId,clientId})
            return res.json(task)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async addExecutor(req,res,next){
        try{
            let {id} = req.params
            let {userId} = req.body
            const taskUser = await UserTask.create({
                userId: userId,
                taskId: id
            })
            
            return res.json(taskUser)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res){
        let {statusId, limit, page} = req.query
        limit = limit||10
        page = page||1
        let offset = page * limit - limit
        let tasks

        if (!statusId){
            tasks = await Task.findAndCountAll({
                include: [{
                    model:Status,
                    as: 'status'
                }],
                limit,offset
            })
        }
        if (statusId){
            tasks = await Task.findAndCountAll({
                where: {statusId}, 
                include: [{
                    model:Status,
                    as: 'status'
                }],
                limit,offset
            })
        }
        return res.json(tasks)
    }

    async getUserTasks(req,res){
        const userId = req.user.id
        let {limit, page} = req.query
        limit = limit||10
        page = page||1
        let offset = page * limit - limit
        let tasks = await Task.findAndCountAll({
            include: [{
                model: UserTask,
                as: 'taskUsers',
                where:{userId}
            },{
                model: Status,
                as: 'status'
            }], 
            limit, offset
        })
        return res.json(tasks)
    }

    async getOne(req,res){
        const {id} = req.params
        let task = await Task.findOne({
            where: {id},
            include:[{
                model: UserTask,
                as: 'taskUsers',
                include:[{
                    model: User,
                    as: 'user'
                }]
            },{
                model: Status,
                as: 'status'
            }]
        })
        return res.json(task)
    }

    async changeStatus(req,res){
        const {id} = req.params
        let {status} = req.body
        const taskUpdate = await Task.update(
            {statusId: status.id},
            {where: {id}}
        ) 
        const task = await Task.findOne({where: {id}})
        return res.json({task})
    }
}

module.exports = new TaskController()