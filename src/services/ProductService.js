const Product = require("../models/Products")
const Categories = require("../models/Categories");
const User = require("../models/Users");
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

const createProduct = async (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { title, release_date, categories, price, banner_url, desc, rating, reviews_count, developer, short_desc, img_urls, vid_urls, publisher } = newProduct;

        try {
            const Category = categories.split(';')[0].trim();
            const checkCate = await Categories.findOne({
                cateName: Category
            });

            if (checkCate === null) {
                reject('The Category is not defined');
            }

            const checkProduct = await Product.findOne({
                title: title
            });

            if (checkProduct !== null) {
                reject('The name of the product already exists');
            }

            const checkPublisher = await User.findById(publisher);

            if (checkPublisher === null) {
                reject('The user is not defined');
            }

            if (checkProduct === null && checkPublisher!==null && checkCate!==null) {

                const createProduct = await Product.create({
                    title,
                    release_date,
                    categories: Category,
                    price,
                    banner_url,
                    desc,
                    rating,
                    reviews_count,
                    developer,
                    short_desc,
                    img_urls: img_urls.split(';').map(url => url.trim()),
                    vid_urls: vid_urls.split(';').map(url => url.trim()),
                    publisher
                });

                if (createProduct) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createProduct
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                reject('The product is not defined');
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

const updateAllProductUrls = async () => {
    try {
        const allProducts = await Product.find();

        const updatedProducts = await Promise.all(allProducts.map(async (product) => {

            if (Array.isArray(product.img_urls) && product.img_urls.length === 1 && typeof product.img_urls[0] === 'string') {
                const updatedImgUrls = product.img_urls[0].split(';').map(url => url.trim());

                await Product.findByIdAndUpdate(product._id, {
                    img_urls: updatedImgUrls
                }, { new: true });
            }

            if (Array.isArray(product.vid_urls) && product.vid_urls.length === 1 && typeof product.vid_urls[0] === 'string') {
                const updatedVidUrls = product.vid_urls[0].split(';').map(url => url.trim());

                await Product.findByIdAndUpdate(product._id, {
                    vid_urls: updatedVidUrls
                }, { new: true });
            }

            return product;
        }));

        return {
            status: 'OK',
            message: 'SUCCESS',
        };
    } catch (error) {
        throw error;
    }
};


const getDetailsProduct = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const product = await Product.findOne({
                _id: id
            })
            if(product === null){
                reject('The product is not defined');
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

const getAllProduct = ()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const allProduct = await Product.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct

            })
        }catch(e){
            reject(e)
        }
    })
}


const getTypeProduct = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await Product.find({
                categories: type
            });

            if (products.length === 0) {
                reject('No products found for the specified category type');
            }

            const formattedProducts = products.map(product => ({
                id: product._id,
                title: product.title,
                banner_url: product.banner_url,
                price: product.price,
                short_desc: product.short_desc
            }));

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: formattedProducts
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getTopRatedProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const topRated = await Product.find()
                .sort({ rating: -1 }) 
                .limit(12) 

            if (topRated.length === 0) {
                reject('No products found');
            }

            const formatted = topRated.map(product => ({
                id: product._id,
                title: product.title,
                banner_url: product.banner_url
            }));

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: formatted
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                reject('The product is not defined');
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
    updateAllProductUrls,
    getAllProduct,
    getTypeProduct,
    getTopRatedProducts,
    getDetailsProduct,
    deleteProduct
}