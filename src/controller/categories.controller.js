const Categories = require("../model/categories.model");

const listCategories = async(req,res) =>{
   try {
    const categories = await Categories.find()
    console.log(categories);

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
        console.log(category);
    
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
        console.log(req.params.category_id);
        const id = req.params.category_id;
        const newCategory = req.body;
        const category = await Categories.create(newCategory);
        console.log(category);
    
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
        console.log(updateData);
        const updatecategory = await Categories.findByIdAndUpdate(id,updateData,{new: true, runValidators: true});
        console.log(updatecategory);
    
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
        console.log(deletedcategory);
    
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

 module.exports = {
     listCategories,
     addCategory,
     updateCategory,
     deleteCategory,
     getcategory
 }