
//ניתובי פונקציות המשתמש
const express=require('express');
const router=express.Router()
const userController=require("../controller/userController.js")
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploadImage');
router.get('/getAllUsers',userController.getAllUsers);
router.get('/getAllUsersByNewz',userController.getAllUsersByNewz);
router.post('/createNewUser',upload.none(),userController.createNewUser);
router.post('/loginUser',userController.loginUser);
router.post('/addNewMess',verifyToken,userController.addNewMess);
router.get('/getUserFromToken',userController.getUserFromToken);
router.put('/upDateUser',verifyToken,upload.none(),userController.upDateUser);
router.delete('/dropeUser',userController.dropeUser);
router.post('/SendEmailToManager',verifyToken,userController.SendEmailToManager)
router.post('/SendEmailToManagerNOToken',userController.SendEmailToManager)



// router.get('/getUseryById/:passward',userController.getUseryById)
module.exports=router;