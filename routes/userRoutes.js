const userController=require("../controller/userController");
const verifyToken=require("../middleware/verifyToken")
const express=require("express");
const router=express.Router();
router.post("/register",userController.userRegisteration)
router.post("/login",userController.userLogin)
router.get("/users",userController.getAllUsers)
router.get("/users/:userId",verifyToken,userController.getUser)
router.get("/user-profile",verifyToken,userController.userProfile)

module.exports=router;