


const { json } = require('express');
const Category = require('../model/categoryModel')
const Trip = require('../model/tripsModel')


// קבלת כל רשימת הקטגוריות
const getAllcategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//יצירת קטגוריה חדשה
const createNewCategory = async (req, res) => {
    try {
        const { name, description, information } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const arr = [];
        const newCategory = new Category({
            name,
            description,
            information,
            imageUrl,
            arr
        });
        const existing = await Category.findOne({ name: req.body.name });
        if (existing) {
            return res.status(400).json({ message: 'שם הקטגוריה כבר קיים' });
        }
        await newCategory.save();

        // החזרת תגובה מוצלחת
        res.status(200).json({
            message: 'newCategory created successfully',
            category: newCategory
        });
    } catch (error) {
        // טיפול בשגיאות
        res.status(500).json({
            message: 'Error creating newCategory',
            error: error.message
        });
    }
};

// עדכון פרטי קטגוריה
const upDateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.body._id);
        if (!category) {
            return res.status(404).json({ message: 'קטגוריה לא נמצאה' });
        }
        const { name, description, information } = req.body;
        if (name !== undefined) {
            category.name = name;
        }
        if (description !== undefined) {
            category.description = description;
        }
        if (information !== undefined) {
            category.information = information;
        }
        if (req.file) {
            category.imageUrl = `/uploads/${req.file.filename}`;
        }
        console.log(category);
        const updatedcategory = await category.save();
        return res.status(200).json({ message: 'הקטגוריה עודכנה בהצלחה', category: updatedcategory });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updateing category',
            error: error.message
        });
    }
};


// מחיקת קטגוריה 
const dropeCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // קודם מעדכנים את כל הטיולים שמצביעים על הקטגוריה הזו
        await Trip.updateMany(
            { parentCategory: categoryId },
            { $set: { parentCategory: null } }
        );
        const category = await Category.findByIdAndDelete(req.params.id);
        // category.status = false
        // await category.();
        res.status(200).json({ message: 'הקטגוריה נמחקה בהצלחה', category: category });
    } catch (error) {
        res.status(500).json({
            message: 'Error droping category',
            error: error.message
        });
    }
};


// קבלת קטגוריה לפי מזהה
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'קטגוריה לא נמצאה' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getAllcategories, createNewCategory, upDateCategory, dropeCategory, getCategoryById }