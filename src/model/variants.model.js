const mongoose = require("mongoose");

const variantsSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            required: true,
        },
        subcategory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategories",
            required: true,
        },
        attributes: {
            type: Object,
            of: String,
            required: true,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Variants = mongoose.model("Variants", variantsSchema);

module.exports = Variants;
