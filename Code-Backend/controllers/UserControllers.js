import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import UserModel from "../models/UserModel.js";

// Create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({success: false, message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = createToken(user._id);
        res.status(200).json({success: true, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Server error"});
    }
}

// Register user
const registerUser = async (req, res) => {
    console.log("Received Data:", req.body); // 🛠 Debugging Line

    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    
    try {
        // Check if user already exists
        const exists = await UserModel.findOne({email});
        if (exists) {
            return res.status(400).json({success: false, message: "User already exists"});
        }

        // Validate email format & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Please enter a valid email"});
        }
        if (password.length < 8) {
            return res.status(400).json({success: false, message: "Please enter a strong password"});
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({name, email, password: hashedPassword});
        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(201).json({success: true, token});
    } catch (error) {
        console.log("Signup Error:", error);
        res.status(500).json({success: false, message: "Server error"});
    }
}

export {loginUser, registerUser};