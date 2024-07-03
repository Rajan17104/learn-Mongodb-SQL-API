const Categories = require("../model/categories.model");

const listCategories = async(req,res) =>{
   try {
    const categories = await Categories.find()
    // console.log(categories);

    if(!categories || categories.length === 0){
        res.status(404).json({
            message: "No categories data found",
            success: false,  
        })
    }

    res.status(200).json({
        message: "Categories data fetched successfully",
        success: true,
        data: categories,
    })

   } catch (error) {
    res.status(500).json({
        message: 'internal server Error' + error.message,
        success: false
    })
   }
 }

 const getcategory = async(req,res) =>{
    try {
        console.log(req.params.category_id);
        const id = req.params.category_id;
        const category = await Categories.findById(id);
        // console.log(category);
    
        if(!category){
            res.status(404).json({
                message: "No category data found",
                success: false,  
            })
        }
    
        res.status(200).json({
            message: "Categories data fetched successfully",
            success: true,
            data: category,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }
 
 const addCategory = async(req,res) =>{
    try {
        const newCategory = req.body;
        const category = await Categories.create(newCategory);
        // console.log(category);
    
        if(!category){
            res.status(400).json({
                message: "Category can not created",
                success: false,  
            })
        }
    
        res.status(201).json({
            message: "New Category created successfully",
            success: true,
            data: category,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }
 
 const updateCategory = async(req,res)=>{
    try {
        console.log(req.params.category_id);
        const id = req.params.category_id;
        const updateData = req.body;
        // console.log(updateData);
        const updatecategory = await Categories.findByIdAndUpdate(id,updateData,{new: true, runValidators: true});
        // console.log(updatecategory);
    
        if(!updatecategory){
            res.status(400).json({
                message: "No category data found",
                success: false,  
            })
        }
    
        res.status(200).json({
            message: "Category fetched and Update successfully",
            success: true,
            data: updatecategory,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }
 
 const deleteCategory = async(req,res)=>{
    try {
        console.log(req.params.category_id);
        const id = req.params.category_id;
        const deletedcategory = await Categories.findByIdAndDelete(id);
        // console.log(deletedcategory);
    
        if(!deletedcategory){
            res.status(404).json({
                message: "No category data found",
                success: false,  
            })
        }
    
        res.status(200).json({
            message: "Category deleted successfully",
            success: true,
            data: deletedcategory,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }

 const countSubcategory = async(req,res)=>{
    try {
        const countSubcategories = await Categories.aggregate(
            [
                {
                  $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "categories_id",
                    as: "subCategories"
                  }
                }
                ,
                {
                  $unwind: {
                    path: "$subCategories",
                  }
                },
                {
                  $group: {
                    _id: "$_id",
                    categoryName : {$first : "$name"},
                    CountSubcategory: {
                      $sum: 1
                    }
                  }
                }
              ]
        );
        console.log(countSubcategories);
    
        if(!countSubcategories){
            res.status(404).json({
                message: "No category data found",
                success: false,  
            })
        }
    
        res.status(200).json({
            message: "count subcategory get",
            success: true,
            data: countSubcategories,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }

 const totalActivecategory = async(req,res)=>{
    try {
        const activeCategory = await Categories.aggregate(
            [
                {
                  $match: {
                    is_active : true
                  }
                },
                {
                  $count: 'Total no of Active Catetogry'
                }
              ]
        );
        console.log(activeCategory);
    
        if(!countSubcategories){
            res.status(404).json({
                message: "No category data found",
                success: false,  
            })
        }
    
        res.status(200).json({
            message: "count Active Category get",
            success: true,
            data: activeCategory,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }

 const highest_number_products = async(req,res)=>{
    try {
        const highestNoproduct = await Categories.aggregate(
            [
                {
                  $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "products"
                  }
                },
                 {
                   $unwind: {
                     path: "$products",
                   }
                 },
                 {
                   $group: {
                     _id: "$_id",
                      Highest_number_products: {
                       $sum: 1
                     }
                   }
                 },
                 {
                   $sort: {
                   Highest_number_products: -1
                 }
                 },
                 {
                   $limit: 1
                 }
               ]
        );
        console.log(highestNoproduct);
    
        if(!highestNoproduct){
            res.status(404).json({
                message: "No category data found",
                success: false,  
            })
        }
    
        res.status(200).json({
            message: "count Active Category get",
            success: true,
            data: highestNoproduct,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }

 const number_products_perCategory = async(req,res)=>{
    try {
        const highestNoproduct = await Categories.aggregate(
            [
                {
                  $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "products"
                  }
                },
                 {
                   $unwind: {
                     path: "$products",
                   }
                 }
                 ,
                 {
                   $group: {
                     _id: "$_id",
                     categroy_id : {$first : "$_id"},
                      average_number_of_products_per_category: {
                       $sum: 1
                     }
                   }
                 }
               ]
        );
        console.log(highestNoproduct);
    
        if(!highestNoproduct){
            res.status(404).json({
                message: "No category data found",
                success: false,  
            })
        }
    
        res.status(200).json({
            message: "count Active Category get",
            success: true,
            data: highestNoproduct,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }

 const totalInActivecategory = async(req,res)=>{
    try {
        const InactiveCategory = await Categories.aggregate(
            [
                {
                  $match: {
                    is_active : false
                  }
                },
                {
                  $count: 'Total no of Active Catetogry'
                }
              ]
        );
        console.log(InactiveCategory);
    
        if(!InactiveCategory){
            res.status(404).json({
                message: "No category data found",
                success: false,  
            })
        }
    
        res.status(200).json({
            message: "count InActive Category get",
            success: true,
            data: InactiveCategory,
        })
    
       } catch (error) {
        res.status(500).json({
            message: 'internal server Error' + error.message,
            success: false
        })
       }
 }


 module.exports = {
     listCategories,
     addCategory,
     updateCategory,
     deleteCategory,
     getcategory,
     countSubcategory,
     totalActivecategory,
     highest_number_products,
     number_products_perCategory,
     totalInActivecategory
 }