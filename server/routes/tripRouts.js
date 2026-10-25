
//ניתובי פונקציות הטיולים
const express=require('express');
const router=express.Router()
const tripController=require("../controller/tripController")
const upload = require('../middlewares/uploadImage');
router.get('/getAlltrips',tripController.getAlltrips);
router.post('/createNewTrip', upload.single('image'),tripController.createNewTrip);
router.post('/searchTrips',tripController.searchTrips);
router.put('/upDateTrip',upload.single('image'),tripController.upDateTrip);
router.delete('/dropeTrip/:id',tripController.dropeTrip);
router.get('/getTripById/:id',tripController.getTripById);
router.post('/getAlltripsByCat',tripController.getAlltripsByCat)
module.exports=router;