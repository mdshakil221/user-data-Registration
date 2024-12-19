const express=require("express");
const {
    registerUser,
    loginUser,
    getProfile,
    getAllProfiles,
    updateProfile,
    deleteUser,
}= require("../controllers/userController");
const {authMiddleware}=require("../middleware/authMiddleware");

const router=express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authmiddleware, getProfile);
router.get("/profiles", authmiddleware, getAllProfiles);
router.get("/profile/:id", authmiddleware, updateProfile);
router.dalete("/profile/id", authmiddleware, deleteUser);

module.exports=router;