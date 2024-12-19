const User=require("../models/Users");
const jwt=require("jsonwebtoken");

const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

const registerUser=async (req, res)=>{
    const {firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup}=req.body;
    try{
        const userExists = await User.findOne({NIDNUmber});
        if(userExists) return res.status(400).json({message: "User already exists"});

        const user = await User.create({firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup});
        res.status(201).json({message: "User Registration Successfully", user});
    } catch(error){
        res.status(500).json({message: "server error", error});
    }
};

const loginUser=async (req, res)=>{
    const {phoneNumber, password}= req.body;
    try{
        const user=await User.findOne({phoneNumber});
        if(!user) return res.status(400).json({message: "Invalid credintials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = generateToken(user._id);
        res.cookie("token", token, {httpOnly: true}).status(200).json({message: "Login Successful", token});
    }catch(error){
        res.status(500).json({message: "Server error", error});
    }
};

const getProfile = async (req, res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: "Server error", error});
    }
};

const getAllProfiles=async (req, res)=>{
    try{
        const users=await User.find().select("-password");
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: "Server error", error});
    }
};

const updateProfile=async (req, res)=>{
    const {id}=req.params;
    const {firstName, lastName, bloodGroup}=req.body;
    try{
        const user=await User.findByIdAndUpdate(id, {firstName, lastName, bloodGroup}, {new: true});
        res.status(200).json({message: "Profile updated successfully", user});
    }catch(error){
        res.status(500).json({message: "Server error", error});
    }
};

const deleteUser=async(req, res)=>{
    const {id}= req.params;
    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfullly"});
    }catch(error){
        res.status(500).json({message: "Server error", error});
    }
};

module.exports = {registerUser, loginUser, getProfile, getAllProfiles, updateProfile, deleteUser};