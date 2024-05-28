const mongoose = require("mongoose");

const ratingeschema = new mongoose.Schema(
    { 

        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        image: {
            type: String,
            required: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);


const Ratinges = mongoose.model('Subcategories', ratingeschema);

module.exports = Ratinges;