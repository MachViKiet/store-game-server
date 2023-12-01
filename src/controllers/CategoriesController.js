const ProductService = require('../services/ProductService')

const createCategory = async (req, res) => {
    try {
        const { cateId, cateName} = req.body

        if(!cateId || !cateName){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await ProductService.createCategory(req.body)
        return res.status(200).json(response)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCategory = async(req,res)=>{
    try{
        const categoryId = req.params.id
        const data = req.body
        if(!categoryId){
            return res.status(200).json({
                status: 'ERR', 
                message: 'The categoryId is required'
            })
        }

        const response = await ProductService.updateCategory(categoryId, data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsCategory = async(req,res)=>{
    try{
        const categoryId = req.params.id
        //const token = req.headers
        if(!categoryId){
            return res.status(200).json({
                status: 'ERR', 
                message: 'The categoryId is required'
            })
        }

        const response = await ProductService.getDetailsCategory(categoryId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCategory = async(req,res)=>{
    try{
        const categoryId = req.params.id
        //const token = req.headers
        if(!categoryId){
            return res.status(200).json({
                status: 'ERR', 
                message: 'The categoryId is required'
            })
        }

        const response = await ProductService.deleteCategory(categoryId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createCategory,
    updateCategory,
    getDetailsCategory,
    deleteCategory
}
