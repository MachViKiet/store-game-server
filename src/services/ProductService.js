const Product = require("../models/Products")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

const createProduct = (newProduct)=>{
    return new Promise(async(resolve, reject)=>{
        const { title, release_date, categories, sub_categories, price, img_url, description, rating, reviews_count } = newProduct
        try{
            const checkProduct = await Product.findOne({
                title: title
            })
            if(checkProduct!==null){
                resolve({
                    status: 'ERR',
                    message: 'The name of product is already'
                })
            }
            if(checkProduct===null){
                const createProduct = await Product.create({
                    title, 
                    release_date, 
                    categories, 
                    sub_categories, 
                    price, 
                    img_url, 
                    description, 
                    rating, 
                    reviews_count
                })
                if(createProduct){
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createProduct
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

const updateProduct = (id, data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
           const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'Update product success',
                data: updatedProduct
            })
        }catch(e){
            reject(e)
        }
    })
}

const getDetailsProduct = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const product = await Product.findOne({
                _id: id
            })
            if(product === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteProduct = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct
}