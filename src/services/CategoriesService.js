const Category = require("../models/Categories")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

const createCategory = (newCategory)=>{
    return new Promise(async(resolve, reject)=>{
        const { cateId, cateName } = newCategory
        try{
            const checkCategory = await Category.findOne({
                cateId: cateId
            })
            if(checkCategory!==null){
                resolve({
                    status: 'ERR',
                    message: 'The name of Category is already'
                })
            }
            if(checkCategory===null){
                const createCategory = await Category.create({
                    cateId, 
                    cateName
                })
                if(createCategory){
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createCategory
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

const updateCategory = (id, data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkCategory = await Category.findOne({
                _id: id
            })
            if(checkCategory === null){
                resolve({
                    status: 'OK',
                    message: 'The Category is not defined'
                })
            }
           const updatedCategory = await Category.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'Update Category success',
                data: updatedCategory
            })
        }catch(e){
            reject(e)
        }
    })
}

const getDetailsCategory = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const category = await Category.findOne({
                _id: id
            })
            if(category === null){
                resolve({
                    status: 'OK',
                    message: 'The Category is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: category
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteCategory = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkCategory = await Category.findOne({
                _id: id
            })
            if(checkCategory === null){
                resolve({
                    status: 'OK',
                    message: 'The Category is not defined'
                })
            }
            await Category.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete Category success',
            })
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createCategory,
    updateCategory,
    getDetailsCategory,
    deleteCategory
}