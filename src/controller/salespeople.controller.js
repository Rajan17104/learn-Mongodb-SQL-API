const { salsepeople } = require("../model");


const listSalespeople = async (req, res) => {
    try {
        const salespeople = await salsepeople.getSalespeople();

        if (!salespeople || salespeople.length === 0) {
            res.status(404).json({
                message: "No salespeople data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Salespeople data fetched successfully",
            success: true,
            data: salespeople,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const addSalespeople = async (sname,city,comm) => {
    try {
        const addsalespeople = await salsepeople.addSalespeople(sname,city,comm);

        if (!addsalespeople || addsalespeople.length === 0) {
            res.status(404).json({
                message: "No salespeople data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Salespeople data add successfully",
            success: true,
            data: addsalespeople,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
    listSalespeople,
    addSalespeople
}