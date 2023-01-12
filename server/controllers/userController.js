const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require("../models/models")
const { Op } = require('sequelize')


function generateJwt(id, email, role){
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}

class UserController{
    async registration(req,res){
        const {email, password, name, surname, phone, role} = req.body
        if (!email || !password || !name || !surname || !phone){
            return next(ApiError.badRequest("Некорректные данные для регистрации"))
        }
        const candidate = await User.findOne({
            where: {
                [Op.or]:[
                    {email},
                    {phone}
                ]
            }
        })
        if (candidate){
            return next(ApiError.badRequest("Пользователь с данным email или телефоном уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, name, surname, phone, role})
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req,res,next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal("Неверная почта или пароль"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAllUsers(req,res){
        let {q, role, limit, page} = req.query
        limit = limit || 10
        page = page || 1
        page = page > 0? page : 1
        let offset = page * limit - limit

        let users
        if (!q && !role) {
            users = await User.findAndCountAll({limit,offset})
        }
        if (!q && role) {
            users = await User.findAndCountAll({where: {role}, limit, offset})
        }
        if (q && !role) {
            users = await User.findAndCountAll({
                where:{
                    [Op.or]:[
                        {
                            name: {[Op.substring]: q}
                        },
                        {
                            surname: {[Op.substring]: q}
                        },
                        {
                            email: {[Op.substring]: q}
                        }
                    ]
                }, limit, offset
            })
        }
        if (q && role){
            users = await User.findAndCountAll({
                where:{
                    [Op.and]:[
                        {role},
                        {[Op.or]:[
                            {
                                name: {[Op.substring]: q}
                            },
                            {
                                surname: {[Op.substring]: q}
                            },
                            {
                                email: {[Op.substring]: q}
                            }
                        ]}
                    ]
                }, limit, offset
            })
        }

        return res.json(users)
    }

    async changePass(req,res,next){
        try{
            let {password} = req.body
            let {id} = req.user
            const hashPassword = await bcrypt.hash(password,5)
            const userUpdate = await User.update(
                {password: hashPassword},
                {where: {id}}
            )
            const user = await User.findOne({where: {id}})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()