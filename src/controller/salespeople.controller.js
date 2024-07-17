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

const addSalespeople = async (req ,res) => {
    try {
        const { sname,city,comm} = req.body;
        const addsalespeople = await salsepeople.addSalespeople(sname,city,comm);
        console.log(addsalespeople);
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

const update = async (req,res) => {
    const { snum } = req.params;
    const { sname,city,comm } = req.body;
    try {
        console.log(snum);
        const updatesalespeople = await salsepeople.updateSalespeople(sname,city,comm,snum);
        console.log(updatesalespeople);

        if (!updatesalespeople || updatesalespeople.length === 0) {
            res.status(404).json({
                message: "No salespeople data found",
                success: false,
            })
        }

        res.status(201).json({
            message: "Salespeople data update successfully",
            success: true,
            data: updatesalespeople,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const deleteSalespeople = async(req, res) => {
    const {snum} = req.params
    try {
        console.log(snum,"dvasv");
        const deletesalespeople = await salsepeople.deleteSalespeople(snum);

        if (!deletesalespeople || deletesalespeople.length === 0) {
            res.status(404).json({
                message: "No salespeople data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Salespeople data delete successfully",
            success: true,
            data: deletesalespeople,
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
    addSalespeople,
    deleteSalespeople,
    update
}