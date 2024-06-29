const Subcategories = require("../model/subcategories.model");

const listSubCategories = async (req, res) => {
    try {
        const subCategories = await Subcategories.find()
        // console.log(subCategories);

        if (!subCategories || subCategories.length === 0) {
            res.status(404).json({
                message: "No categories data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Categories data fetched successfully",
            success: true,
            data: subCategories,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}

const addSubSubCategory = async (req, res) => {
    try {
        console.log(req.params.subcategory_id);
        const id = req.params.subcategory_id;
        const newsubCategory = req.body;
        const subCategory = await Subcategories.create(newsubCategory);
        console.log(subCategory);

        if (!subCategory) {
            res.status(400).json({
                message: "Category can not created",
                success: false,
            })
        }

        res.status(201).json({
            message: "New Category created successfully",
            success: true,
            data: subCategory,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}

const updateSubSubCategory = async (req, res) => {
    try {
        console.log(req.params.subcategory_id);
        const id = req.params.subcategory_id;
        const updateData = req.body;
        console.log(updateData);
        const updatesubCategory = await Subcategories.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        console.log(updatesubCategory);

        if (!updatesubCategory) {
            res.status(400).json({
                message: "No category data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Category fetched and Update successfully",
            success: true,
            data: updatesubCategory,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}

const deleteSubSubCategory = async (req, res) => {
    try {
        console.log(req.params.subcategory_id);
        const id = req.params.subcategory_id;
        const deletedsubCategory = await Subcategories.findByIdAndDelete(id);
        console.log(deletedsubCategory);

        if (!deletedsubCategory) {
            res.status(404).json({
                message: "No category data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Category deleted successfully",
            success: true,
            data: deletedsubCategory,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}

const getsubCategory = async (req, res) => {
    try {
        console.log(req.params.subcategory_id);
        const id = req.params.subcategory_id;
        const subCategory = await Subcategories.findById(id);
        console.log(subCategory);

        if (!subCategory) {
            res.status(404).json({
                message: "No category data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Categories data fetched successfully",
            success: true,
            data: subCategory,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}
const filtersubcategory = async (req, res) => {
    try {
        console.log(req.params.category_id);
        const id = req.params.category_id;
        const subCategory = await Subcategories.find({ categories_id: id });
        // console.log(subCategory);

        if (!subCategory) {
            res.status(404).json({
                message: "No category data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Categories data fetched successfully",
            success: true,
            data: subCategory,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}

const countproducts = async (req, res) => {
    try {
        console.log(req.params.category_id);
        const id = req.params.category_id;
        const countproduct = await Subcategories.aggregate(
            [
                {
                  $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "subcategory_id",
                    as: "products"
                  }
                }
                ,
                {
                  $unwind: {
                    path: "$products",
                  }
                },
                {
                  $group: {
                    _id: "$_id",
                    subcategoryName : {$first : "$name"},
                    CountProducts: {
                      $sum: 1
                    }
                  }
                }
              ]
        );

        if (!countproduct) {
            res.status(404).json({
                message: "No  data found",
                success: false,
            })
        }

        res.status(200).json({
            message: "Total products get successfully",
            success: true,
            data: countproduct,
        })

    } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
    }
}

module.exports = {
    listSubCategories,
    addSubSubCategory,
    updateSubSubCategory,
    deleteSubSubCategory,
    getsubCategory,
    filtersubcategory,
    countproducts
}