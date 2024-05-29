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
 
 const addCategory = (req,res) =>{
     console.log("add Category");
 }
 
 const updateCategory = (req,res)=>{
     console.log("update Category");
 }
 
 const deleteCategory = (req,res)=>{
     console.log("delete Category");
 }
 
 
 module.exports = {
     listCategories,
     addCategory,
     updateCategory,
     deleteCategory,
     getcategory
 }