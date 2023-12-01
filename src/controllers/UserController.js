const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser= async(req,res)=>{
    try{
        const {name,email, password, confirmPassword, phone, role} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        const allowedRoles =['Customer', 'Seller'];

        if(!name || !email || !password || !confirmPassword || !phone || !role){
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }else if(password!==confirmPassword){
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is equal confirm password'
            })
        }else if (!allowedRoles.includes(role)) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Invalid user role',
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser= async(req,res)=>{
    try{
        const {email, password, confirmPassword} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if(!email || !password || !confirmPassword){
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }else if(password!==confirmPassword){
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is equal confirm password'
            })
        }
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async(req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async(req,res)=>{
    try{
        const userId = req.params.id
        //const token = req.headers
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async(req,res)=>{
    try{
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async(req,res)=>{
    try{
        const userId = req.params.id
        //const token = req.headers
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async(req,res)=>{
    try{
        const token = req.headers.token.split(' ')[1]
        if(!token){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The token is required'
            })
        }

        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateCart = async(req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.updateCart(userId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCart = async(req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        //const token = req.headers
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.deleteCart(userId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateWishList = async(req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.updateWishList(userId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteWishList = async(req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        //const token = req.headers
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.deleteWishList(userId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateTransHis = async(req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.updateTransHis(userId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteTransHis = async(req,res)=>{
    try{
        const userId = req.params.id
        const data = req.body
        //const token = req.headers
        if(!userId){
            return res.status(404).json({
                status: 'ERR', 
                message: 'The userId is required'
            })
        }

        const response = await UserService.deleteTransHis(userId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,

    updateCart,
    deleteCart,

    updateWishList,
    deleteWishList,

    updateTransHis,
    deleteTransHis
}