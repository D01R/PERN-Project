const {Type, Status} = require('../models/models')
const ApiError = require('../error/ApiError')

class StatusController{
    async create(req,res){
        const {name} = req.body
        const status = await Status.create({name})
        return res.json(status)
    }

    async getAll(req,res){
        const statuses = await Status.findAll()
        return res.json(statuses)
    }
}

module.exports = new StatusController()