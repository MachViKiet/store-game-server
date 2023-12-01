const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { title, release_date, categories, price, img_url, description, rating, reviews_count } = req.body

        if(!title || !release_date || !categories || price == null || !img_url || !description || !rating || !reviews_count){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async(req,res)=>{
    try{
        const productId = req.params.id
        const data = req.body
        if(!productId){
            return res.status(200).json({
                status: 'ERR', 
                message: 'The productId is required'
            })
        }

        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsProduct = async(req,res)=>{
    try{
        const productId = req.params.id
        //const token = req.headers
        if(!productId){
            return res.status(200).json({
                status: 'ERR', 
                message: 'The productId is required'
            })
        }

        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const productId = req.params.id
        //const token = req.headers
        if(!productId){
            return res.status(200).json({
                status: 'ERR', 
                message: 'The productId is required'
            })
        }

        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct
}