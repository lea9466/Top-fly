
//ניתובי פונקציות הקטגוריות
const express=require('express');
const router=express.Router()
const categoryController=require("../controller/categoryController")
const upload = require('../middlewares/uploadImage');
router.get('/getAllcategories',categoryController.getAllcategories);
router.post('/createNewCategory', upload.single('image'),categoryController.createNewCategory);
router.put('/upDateCategory',upload.single('image'),categoryController.upDateCategory);
router.delete('/dropeCategory/:id',categoryController.dropeCategory);
router.get('/getCategoryById/:id',categoryController.getCategoryById)
module.exports=router;