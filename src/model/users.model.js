const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
            trim:true,
            lowercase:true
        },
        address:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim:true,
            lowercase:true            
        },
        password:{
            type: String,
            required: true,
            trim:true,
            lowercase:true           
        },
        mobile_number:{
            type: Number,
            required: true,
            unique: true
        },
        role:{
            type: String,
            required: true,
            default: "user"
        },
        refrence_Token:{
            type: String,
            default:null
        }
    },
    {
        timestamps: true,
        versionKey:false
    }
)


const Users = mongoose.model("Users",usersSchema);
module.exports = Users;