const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
    { 
        // category_id:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"Categories",
        //     required:true,
        // },
        // subcategory_id:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"Subcategories",
        //     required:true,
        // },
        // seller_id:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"Users",
        //     required:true,
        // },
        
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
            type: {
                public_id : String,
                url : String
            },
            required: true,
        },
        // price :{
        //     type: Number,
        //     required : true,

        // },
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

const Products = mongoose.model("products",productsSchema);
module.exports = Products;