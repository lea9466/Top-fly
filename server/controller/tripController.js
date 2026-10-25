
const Trip = require('../model/tripsModel')
const Category = require('../model/categoryModel')
//קבלת כל היעדים
const getAlltrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//קבלת כל הטיולים של קטגוריה מסוימת
const getAlltripsByCat = async (req, res) => {
    try {
        const trips = await Trip.find({ parentCategory: req.body.parentCategory });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//יצירת יעד חדש
const createNewTrip = async (req, res) => {
    try {
        const { name, description, parentCategory, start, end, hotel } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        const newTrip = new Trip({
            name,
            parentCategory,
            description,
            hotel,
            start,
            end,
            imageUrl,

        });
        await Category.findByIdAndUpdate(parentCategory, {
            $push: { subCategories: newTrip._id }
        });
        console.log(newTrip)
        await newTrip.save();

        // החזרת תגובה מוצלחת
        res.status(200).json({
            message: 'newTrip created successfully',
            Trip: newTrip
        });
    } catch (error) {
        // טיפול בשגיאות
        res.status(500).json({
            message: 'Error creating newTrip',
            error: error.message
        });
    }
};

// עדכון פרטי יעד
const upDateTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.body._id);
        if (!trip) {
            return res.status(404).json({ message: 'טיול לא נמצא' });
        }
        const { name, description, parentCategory, start, end, hotel } = req.body;
        if (name !== undefined) {
            trip.name = name;
        }
        if (description !== undefined) {
            trip.description = description;
        }
        if (parentCategory !== undefined) {
            trip.parentCategory = parentCategory;
        }
        if (end !== undefined) {
            trip.end = end;
        }
        if (start !== undefined) {
            trip.start = start;
        }
        if (hotel !== undefined) {
            trip.hotel = hotel;
        }
        if (req.file) {
            trip.imageUrl = `/uploads/${req.file.filename}`;
        }
        console.log(trip);

        const updatedT = await trip.save();
        res.status(200).json({ message: 'הטיול עודכן בהצלחה', trip: updatedT });
    } catch (error) {
        res.status(500).json({
            message: 'Error updateing trip',
            error: error.message
        });
    }
};

// מחיקת יעד 
const dropeTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'טיול לא נמצא' });
        }

        // הסרת הטיול ממערך subCategories של הקטגוריה שאליה הוא שייך
        await Category.findByIdAndUpdate(
            trip.parentCategory,
            { $pull: { subCategories: trip._id } }
        );
        // category.status = false
        // await category.();
        res.status(200).json({ message: 'היעד נמחקה בהצלחה', trip: trip });
    } catch (error) {
        res.status(500).json({
            message: 'Error droping trip',
            error: error.message
        });
    }
};

// קבלת טיול לפי מזהה
const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'יעד לא נמצאה' });
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// חיפוש טיולים לפי טקסט
const searchTrips = async (req, res) => {
    try {
        const { searchText } = req.body;
        if (!searchText) {
            return res.status(400).json({ message: 'חסר טקסט לחיפוש' });
        }

        // שימוש ב-RegExp לחיפוש חלקי ולא רגיש לאותיות
        const regex = new RegExp(searchText, 'i'); // 'i' = לא רגיש לאותיות
        const trips = await Trip.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        });

        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({
            message: 'שגיאה בחיפוש טיולים',
            error: error.message
        });
    }
};

module.exports = { createNewTrip, getAlltrips, dropeTrip, upDateTrip, getTripById, getAlltripsByCat ,searchTrips}