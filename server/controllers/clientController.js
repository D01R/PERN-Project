const ApiError = require("../error/ApiError")
const { Client, Task, Status } = require("../models/models")
const { Op } = require("sequelize")
const sequelize = require('sequelize')

class ClientController{
    async create(req,res,next){
        try{
            let {name, surname, phone, email} = req.body
            const client = await Client.create({name, surname, phone, email})
            return res.json(client)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res){
        let {q, limit, page} = req.query
        limit = limit || 10
        page = page || 1
        page = page > 0? page : 1
        let offset = page * limit - limit
        let clients

        if (!q) {
            clients = await Client.findAndCountAll({limit,offset})
        }
        if (q) {
            clients = await Client.findAndCountAll({
                where:{
                    [Op.or]:[
                        {
                            name: {[Op.substring]:q}
                        },
                        {
                            surname: {[Op.substring]:q}
                        }
                    ]
                }, limit, offset
            })
        }

        return res.json(clients)
    }

    async getOne(req,res){
        let {id} = req.params
        const client = await Client.findOne({
            where: {id},
            include: [{
                model: Task, 
                as: 'clientTasks',
                include: [{
                    model: Status,
                    as: 'status'
                }]
            }]
        })
        return res.json(client)
    }

    async changeInfo(req,res,next){
        try{
            let {id} = req.params
            let {name, surname, phone, email} = req.body
            const client = await Client.update(
                {
                    name, surname, phone, email
                },
                {
                    where: {id}
                }
            )
            return res.json(client)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ClientController()