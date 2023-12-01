const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        title: {type: String, require: true},
        // release_date: {type: String, require: true},
        categories: {type: String, require: true},

        amount: {type: Number, default: 1},
        // sub_categories: {type: String, require: true},
        price: {type: Number, require: true},
        img_banner: {type: String, require:true},
        img_normal: {type: Array, require:true},
        description: {type: String, require: true},
        rating: {type: Number, require: true},
        reviews_count: {type: Number, require: true},
        developer: {type: String, require:true},

        publisher: {type: mongoose.Schema.Types.ObjectId,  ref: 'Users', require: true},

    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;