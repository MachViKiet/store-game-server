const User = require("../models/Users")
const Product = require("../models/Products")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

const createUser = (newUser)=>{
    return new Promise(async(resolve, reject)=>{
        const {name,email, password, phone, role, cart, wishlist, transHistory } = newUser

        try{
            const checkUser = await User.findOne({
                email: email
            })

            if(checkUser!==null){
                reject('The email is already');
            }

            const hash = bcrypt.hashSync(password, 10)

            if(checkUser===null){
                const createUser = await User.create({
                    name,
                    email, 
                    password: hash, 
                    phone,
                    role,
                    cart: [],
                    wishlist: [],
                    transHistory: []
                })
                if(createUser){
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createUser
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

const loginUser = (userLogin)=>{
    return new Promise(async(resolve, reject)=>{
        const {email, password, confirmPassword} = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })

            if(checkUser === null){
                reject('The user is not defined');
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if(!comparePassword){
                reject('The password or username is incorrect');
            }
            const user_id = checkUser._id
            const access_token = await generalAccessToken({
                id: checkUser.id,
                role: checkUser.role
            })
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                role: checkUser.role
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                user_id,
                access_token, 
                refresh_token
            })
        }catch(e){
            reject(e)
        }
    })
}

const updateUser = (id, data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null){
                reject('The user is not defined');
            }
           const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'Update user success',
                data: updatedUser
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteUser = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null){
                reject('The user is not defined');
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        }catch(e){
            reject(e)
        }
    })
}

const getAllUser = ()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allUser

            })
        }catch(e){
            reject(e)
        }
    })
}

const getDetailsUser = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const user = await User.findOne({
                _id: id
            })
            if(user === null){
                reject('The user is not defined');
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        }catch(e){
            reject(e)
        }
    })
}

const getInfo = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        }catch(e){
            reject(e)
        }
    })
}

// có amount
// const updateObject = async (userId, updatedArr) => {
//     try {
//         const user = await User.findById(userId);

//         // Check if the user exists
//         if (!user) {
//             throw new Error('User not found');
//         }

//         // Get the current cart from the user or initialize an empty array
//         const currentCart = user.cart || [];

//         // Check if updatedArr is an array
//         if (!Array.isArray(updatedArr)) {
//             throw new Error('Invalid data format. updatedArr must be an array.');
//         }

//         for (const updatedProduct of updatedArr) {
//             // Find the product in the current cart by title
//             const existingProduct = currentCart.find(item => item.title === updatedProduct.title);

//             if (existingProduct) {
//                 // If the product exists, update the amount
//                 existingProduct.amount = (existingProduct.amount || 0) + (updatedProduct.amount || 1);
//             } else {
//                 const checkProduct = await Product.findOne({
//                     title: updatedProduct.title,
//                 });

//                 if (!checkProduct) {
//                     throw new Error('The Product is not defined');
//                 }

//                 // If the product doesn't exist in the cart, add it with the provided amount or 1
//                 currentCart.push({ ...updatedProduct, amount: updatedProduct.amount || 1 });
//             }
//         }

//         // Update the cart in the user object
//         user.cart = currentCart;

//         // Mark the 'cart' field as modified
//         user.markModified('cart');

//         // Save the updated user to the database
//         const updatedUser = await user.save();

//         return {
//             status: 'OK',
//             message: 'Cart updated successfully',
//             data: updatedUser
//         };
//     } catch (error) {
//         console.error('Error updating cart:', error);
//         throw new Error('Error updating cart: ' + error.message);
//     }
// };

const updateCart = (userId, updatedArr) => {
    return new Promise(async(resolve, reject)=>{
        try {
            // Find the user by ID
            const user = await User.findById(userId);

            // Check if the user exists
            if (!user) {
                reject('The user is not defined');
            }

            // Get the current cart from the user or initialize an empty array
            const currentCart = user.cart || [];

            // Check if updatedArr is an array
            if (!Array.isArray(updatedArr)) {
                reject('Invalid data format. updatedArr must be an array.');
            }

            for (const updatedProduct of updatedArr) {
                // Find the product in the current cart by title
                const existingProduct = currentCart.find(item => item.title === updatedProduct.title);

                if (existingProduct) {
                    reject('The Product is already in the cart');
                } else {
                    // Check if the product exists in the database
                    const checkProduct = await Product.findOne({
                        title: updatedProduct.title,
                    });

                    if (!checkProduct) {
                        reject('The Product is not defined');
                    }else{
                        // If the product doesn't exist in the cart, add it
                        currentCart.push({ ...updatedProduct });
                    }
                }
            }
            // Update the cart in the user Card
            user.cart = currentCart;

            // Save the updated user to the database
            const updatedUser = await user.save();

            resolve({
                status: 'OK',
                message: 'Update cart success',
                data: updatedUser
            })
        } catch(e){
            reject(e)
        }
    })
};

const deleteCart = (userId, deletedArr) => {
    return new Promise(async(resolve, reject)=>{
        try {
            // Find the user by ID
            const user = await User.findById(userId);
    
            // Check if the user exists
            if (!user) {
                reject('The user is not defined');
            }
    
            // Get the current cart from the user or initialize an empty array
            const currentCart = user.cart || [];
    
            // Check if updatedArr is an array
            if (!Array.isArray(deletedArr)) {
                reject('Invalid data format. deletedArr must be an array.');
            }
    
            for(const deletedProduct of deletedArr){
                const productIndex = currentCart.findIndex(item => item.title === deletedProduct.title);
    
                if (productIndex !== -1) {
                    // If the product exists in the cart, remove it
                    currentCart.splice(productIndex, 1);
                } else {
                    reject('The Product is not in the cart');
                }
            }
    
            // Update the cart in the user Card
            user.cart = currentCart;
    
            // Save the updated user to the database
            const deletedUser = await user.save();
    
            resolve({
                status: 'OK',
                message: 'Product removed successfully',
                data: deletedUser
            })
        } catch(e){
            reject(e)
        }
    })
}

const updateWishList = (userId, updatedArr) => {
    return new Promise(async(resolve, reject)=>{
        try {
            // Find the user by ID
            const user = await User.findById(userId);
    
            // Check if the user exists
            if (!user) {
                reject('The user is not defined');
            }
    
            // Get the current wishlist from the user or initialize an empty array
            const currentWishList = user.wishlist || [];
    
            // Check if updatedArr is an array
            if (!Array.isArray(updatedArr)) {
                reject('Invalid data format. updatedArr must be an array.');
            }
    
            for (const updatedProduct of updatedArr) {
                // Find the product in the current wishlist by title
                const existingProduct = currentWishList.find(item => item.title === updatedProduct.title);
    
                if (existingProduct) {
                    reject('The Product is already in the WishList');
                } else {
                    // Check if the product exists in the database
                    const checkProduct = await Product.findOne({
                        title: updatedProduct.title,
                    });
    
                    if (!checkProduct) {
                        reject('The Product is not defined');
                    }else{
                        // If the product doesn't exist in the wishlist, add it
                        currentWishList.push({ ...updatedProduct });
                    }
                }
            }
            // Update the wishlist in the user Card
            user.wishlist = currentWishList;
    
            // Save the updated user to the database
            const updatedUser = await user.save();
    
            resolve({
                status: 'OK',
                message: 'Update WishList success',
                data: updatedUser
            })
        } catch(e){
            reject(e)
        }
    })
};

const deleteWishList = (userId, deletedArr) => {
    return new Promise(async(resolve, reject)=>{
        try {
            // Find the user by ID
            const user = await User.findById(userId);
    
            // Check if the user exists
            if (!user) {
                reject('The user is not defined');
            }
    
            // Get the current wishlist from the user or initialize an empty array
            const currentWishList = user.wishlist || [];
    
            // Check if updatedArr is an array
            if (!Array.isArray(deletedArr)) {
                reject('Invalid data format. deletedArr must be an array.');
            }
    
            for(const deletedProduct of deletedArr){
                const productIndex = currentWishList.findIndex(item => item.title === deletedProduct.title);
    
                if (productIndex !== -1) {
                    // If the product exists in the wishlist, remove it
                    currentWishList.splice(productIndex, 1);
                } else {
                    reject('The Product is not in the wishlist');
                }
            }
    
            // Update the wishlist in the user Card
            user.wishlist = currentWishList;
    
            // Save the updated user to the database
            const deletedUser = await user.save();
    
            resolve({
                status: 'OK',
                message: 'Product removed successfully',
                data: deletedUser
            })
        } catch(e){
            reject(e)
        }
    })
}

const updateTransHis = (userId, updatedArr) => {
    return new Promise(async(resolve, reject)=>{
        try {
            // Find the user by ID
            const user = await User.findById(userId);
    
            // Check if the user exists
            if (!user) {
                reject('The user is not defined');
            }
    
            // Get the current transHistory from the user or initialize an empty array
            const currentTransHis = user.transHistory || [];
    
            // Check if updatedArr is an array
            if (!Array.isArray(updatedArr)) {
                reject('Invalid data format. updatedArr must be an array.');
            }
    
            for (const updatedProduct of updatedArr) {
                // Find the product in the current transHistory by title
                const existingProduct = currentTransHis.find(item => item.title === updatedProduct.title);
    
                if (existingProduct) {
                    reject('The Product is already in the transHistory');
                } else {
                    // Check if the product exists in the database
                    const checkProduct = await Product.findOne({
                        title: updatedProduct.title,
                    });
    
                    if (!checkProduct) {
                        reject('The Product is not defined');
                    }else{
                        // If the product doesn't exist in the transHistory, add it
                        currentTransHis.push({ ...updatedProduct });
                    }
                }
            }
            // Update the transHistory in the user Card
            user.transHistory = currentTransHis;
    
            // Save the updated user to the database
            const updatedUser = await user.save();
    
            resolve({
                status: 'OK',
                message: 'Update transHistory success',
                data: updatedUser
            })
        } catch(e){
            reject(e)
        }
    })
};

const deleteTransHis = (userId, deletedArr) => {
    return new Promise(async(resolve, reject)=>{
        try {
            // Find the user by ID
            const user = await User.findById(userId);
    
            // Check if the user exists
            if (!user) {
                reject('The user is not defined');
            }
    
            // Get the current transHistory from the user or initialize an empty array
            const currentTransHis = user.transHistory || [];
    
            // Check if updatedArr is an array
            if (!Array.isArray(deletedArr)) {
                reject('Invalid data format. DeletedArr must be an array.');
            }
    
            for(const deletedProduct of deletedArr){
                const productIndex = currentTransHis.findIndex(item => item.title === deletedProduct.title);
    
                if (productIndex !== -1) {
                    // If the product exists in the transHistory, remove it
                    currentTransHis.splice(productIndex, 1);
                } else {
                    reject('The Product is not in the transHistory');
                }
            }
    
            // Update the transHistory in the user Card
            user.transHistory = currentTransHis;
    
            // Save the updated user to the database
            const deletedUser = await user.save();
    
            resolve({
                status: 'OK',
                message: 'Product removed successfully',
                data: deletedUser
            })
        } catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    getInfo,

    updateCart,
    deleteCart,
    
    updateWishList,
    deleteWishList,

    updateTransHis,
    deleteTransHis
}