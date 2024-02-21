const Auth = require('../models/authModel');
const User = require('../models/authModel');
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    let userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
        return res.status(400).json({success: false, message: "Sorry a user with this email already exists" })
    }
    let userName = await User.findOne({ userName: req.body.userName });
    if (userName) {
        return res.status(400).json({success: false, message: "Sorry a user with this username already exists" })
    }
    if (req.body.password !== req.body.confPassword) {
        return res.status(400).json({success: false, message: "Password does not match" })
    }
    try {
        const registerUser = new Auth({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            gender: req.body.gender
        });
        // Generate auth token and redirect
        const token = await registerUser.generateAuthToken();
        // console.log(token);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 86400000),
            httpOnly: true,
        });
        const registered = await registerUser.save();
        res.status(201).send({success: true, message: "User registered successfully", data: registered})
    } catch (error) {
        res.status(404).send({success: false, message: "User registration failed", error: error});
    }
}

const login = async (req, res) => {
    try {
        const username = req.body.userName;
        const password = req.body.password;
        let user = await Auth.findOne({ email: username });
        if (!user) {
            user = await Auth.findOne
            ({ userName: username });
        }
        if (!user) {
            return res.status(400).send({success: false, message: "Invalid Username"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = await user.generateAuthToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true,
            });
            res.status(200).send({success: true, message: "User logged in successfully"})
        } else {
            res.status(400).send({success: false, message: "Invalid Password"})
        }
    }
    catch (error) {
        res.status(400).send({success: false, message: "User login failed", error: error});
    }
}

module.exports = {
    register, login
}