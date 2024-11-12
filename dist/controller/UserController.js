"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = require("../models/UserModel");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const logger_1 = __importDefault(require("../logger"));
// Generate token by provided secret key
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '30d',
    });
};
// Signup new user
const signup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !password || !phone || !role) {
        res.status(400);
        logger_1.default.error("Please add all fields");
        throw new Error('Please add all fields');
    }
    // Check if user exists
    const existingUser = yield UserModel_1.User.findOne({ email });
    if (existingUser) {
        res.status(400);
        logger_1.default.error("User already exists");
        throw new Error('User already exists');
    }
    // Hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    // Create user
    const user = yield UserModel_1.User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id),
        });
        logger_1.default.info("Signup user successfully");
    }
    else {
        res.status(400);
        logger_1.default.error("Can not signup user");
        throw new Error('Invalid user data');
    }
}));
//User login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check for user email
        const user = yield UserModel_1.User.findOne({ email });
        // Check for user password
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id),
            });
            logger_1.default.info("User login successfully");
        }
        else {
            res.status(400);
            logger_1.default.error("Error for login");
            throw new Error('Error for login');
        }
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for login");
        res.status(500).json({ message: "Error for login" });
    }
});
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield UserModel_1.User.find({});
        if (!allUsers) {
            logger_1.default.error("Users not found");
            return res.status(404).json({ message: "Users not found" });
        }
        logger_1.default.info("Load users successfully");
        res.status(201).json(allUsers);
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for getting all users");
        res.status(500).json({ message: "Error for getting all users" });
    }
});
// Get user details by user ID
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = yield UserModel_1.User.findById(req.params.id);
        if (!userDetails) {
            logger_1.default.error("Users not found");
            return res.status(404).json({ message: "User not found" });
        }
        logger_1.default.info("Load user successfully");
        res.status(201).json(userDetails);
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for getting user details");
        res.status(500).json({ message: "Error for getting user details" });
    }
});
// Update user details by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password, role } = req.body;
        // Check  user data
        if (!name || !email || !password || !phone || !role) {
            res.status(400);
            logger_1.default.error("Please add all fields");
            throw new Error('Please add all fields');
        }
        // Hash password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const updateUser = yield UserModel_1.User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            password: hashedPassword,
            role
        });
        logger_1.default.info("Update user successfully");
        res.status(201).json({ updateUser });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for updating user");
        res.status(500).json({ message: "Error for updating user" });
    }
});
// Delete user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUser = yield UserModel_1.User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            logger_1.default.error("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        logger_1.default.info("Delete user successfully");
        return res.status(204).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for deleting user");
        res.status(500).json({ message: "Error for deleting user details" });
    }
});
exports.default = {
    signup,
    login,
    getUsers,
    getUserDetails,
    updateUser,
    deleteUser,
};
