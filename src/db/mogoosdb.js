const mongoose = require('mongoose');

const connectDb = async () => {

    try {
        await mongoose.connect('mongodb+srv://Akshay:747511Axy@cluster0.w4a6rrh.mongodb.net/eCommerce')
            .then(() => {
                console.log("mogoose connect ");
            })
            .catch((error) => {
                console.log("error", error)
            })
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = connectDb;