const Varients = require("../model/variants.model")
const fileupload = require("../utils/cloudinary");

const listVarients = async (req, res) => {
    try {

        const varients = await Varients.find();

        if (!varients || varients.length === 0) {
            return res.status(404).json({
                message: "No varients found",
                success: false,
            });
        }
        res.status(200).json({
            message: "varients fetched successfully",
            success: true,
            data: varients,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred while fetching varients: " + error.message,
            success: false
        });
    }
};

const getVarients = async (req, res) => {

    try {

        const varients = await Varients.findById(req.params.varients_id);
        console.log(varients);

        if (!varients) {
            return res.status(404).json({
                message: "varients not found",
                success: false,
            });
        }
        res.status(200).json({
            message: "varients fetched successfully",
            success: true,
            data: varients,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred while fetching varients: " + error.message,
            success: false
        });
    }
};

const addVarients = async (req, res) => {
    try {
        console.log(req.files, res.files);
        const fileRes = await Promise.all(req.files.map((v) => fileupload("pro_img", v.path)))
        console.log(fileRes);
        const product_image = fileRes.map((v) => ({
            public_id: v.public_id,
            url: v.url
        }));
        const newData = {
            ...req.body,
            product_image
        }

        const varients = await Varients.create(newData);
        // console.log(varients);

        if (!varients) {
            return res.status(400).json({
                message: "Product ID, Category ID, Subcategory ID, and attributes are required",
                success: false,
            });
        }


        return res.status(201).json({
            message: "varients added successfully",
            success: true,
            data: varients,
        });


    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while adding varients: " + error.message,
            success: false,
        });
    }
};

const updateVarients = async (req, res) => {
    try {
        console.log(req.body);
        const varients_id = req.params.varients_id;

        let newData = '';

        if (req.files) {

            const fileRes = await Promise.all(req.files.map((v) => fileupload("pro_img", v.path)))
            const product_image = fileRes.map((v) => ({
                public_id: v.public_id,
                url: v.url
            }));
            newData = {
                ...req.body,
                product_image
            }

        } else {
            newData = req.body;
        }
        const updatedVarients = await Varients.findByIdAndUpdate(varients_id, newData, { new: true, runValidators: true });

        if (!updatedVarients) {
            return res.status(404).json({
                message: "Variant not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "Variant updated successfully",
            success: true,
            data: updatedVarients,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred while updating variant: " + error.message,
            success: false,
        });
    }
};

module.exports = { updateVarients };

const deleteVarients = async (req, res) => {
    try {
        const varients_id = req.params.varients_id;
        console.log(varients_id);

        const variant = await Varients.findByIdAndDelete(varients_id);
        console.log(variant);

        if (!variant) {
            return res.status(404).json({
                message: "variant not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "variant deleted successfully",
            success: true,
            data: variant,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while deleting variant: " + error.message,
            success: false,
        });
    }
};





module.exports = {
    listVarients,
    getVarients,
    addVarients,
    updateVarients,
    deleteVarients
};