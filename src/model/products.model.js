const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
    { 
        subcategory_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subcategories",
            required:true,
        },
        seller_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required:true,
        },
        
        name:{
            type: String,
            required: true,
            unique: true,
            trim:true,
            lowercase:true
        },
        description:{
            type: String,
            required: true,
            trim:true,
            lowercase:true
        },
        image:{
            type: String,
            required: true,
        },
        is_active:{
            type:Boolean,
            default:true
        },

    },
    {
        timestamps: true,
        versionKey:false
    }
);

const Products = mongoose.model("Products",productsSchema);
module.exports = Products;