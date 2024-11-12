import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response } from "express";
import { User } from "../models/UserModel";
import asyncHandler from 'express-async-handler'
import logger from "../logger";
// Generate token by provided secret key
const generateToken = (id:Object) => {
  return jwt.sign({ id }, process.env.SECRET_KEY!, {
    expiresIn: '30d',
  })
}
// Signup new user
const signup = asyncHandler(async (req: Request, res: Response) => {
  const {name, email, phone, password, role } = req.body;

  if (!name || !email || !password || !phone || !role) {
    res.status(400)
    logger.error("Please add all fields");
    throw new Error('Please add all fields')
  }
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400)
    logger.error("User already exists");
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name, 
    email, 
    phone, 
    password: hashedPassword, 
    role 
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    })
    logger.info("Signup user successfully");
  } else {
    res.status(400)
    logger.error("Can not signup user");
    throw new Error('Invalid user data')
  }
})
//User login
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
try {
  // Check for user email
  const user = await User.findOne({ email })
  // Check for user password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    })
    logger.info("User login successfully");
  } else {
    res.status(400)
    logger.error("Error for login");
    throw new Error('Error for login')
  }
} catch (error) {
  console.log(error);
  logger.error("Error for login");
  res.status(500).json({ message: "Error for login" });
  
}
  
}
// Get all users
const getUsers= async (req:Request, res:Response): Promise<any> => {
  try {
    const allUsers = await User.find({})
    if(!allUsers){
      logger.error("Users not found");
      return res.status(404).json({ message: "Users not found" });
    }
    logger.info("Load users successfully");
    res.status(201).json(allUsers);
  } catch (error) {
    console.log(error);
    logger.error("Error for getting all users");
    res.status(500).json({ message: "Error for getting all users" });
  }
}
// Get user details by user ID
const getUserDetails= async (req:Request, res:Response): Promise<any> => {
  try {
    const userDetails = await User.findById(req.params.id)
    if(!userDetails){
      logger.error("Users not found");
      return res.status(404).json({ message: "User not found" });
    }
    logger.info("Load user successfully");
    res.status(201).json(userDetails);
  } catch (error) {
    console.log(error);
    logger.error("Error for getting user details");
    res.status(500).json({ message: "Error for getting user details" });
  }
}
// Update user details by ID
const updateUser = async (req: Request, res: Response) => {
  try {
    const {name, email, phone, password, role } = req.body;
    // Check  user data
    if (!name || !email || !password || !phone || !role) {
      res.status(400)
      logger.error("Please add all fields");
      throw new Error('Please add all fields')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      name, 
      email, 
      phone, 
      password: hashedPassword, 
      role 
    });
    logger.info("Update user successfully");
    res.status(201).json({updateUser});
  } catch (error) {
    console.log(error);
    logger.error("Error for updating user");
    res.status(500).json({ message: "Error for updating user" });
  }
}
// Delete user by ID
const deleteUser= async (req:Request, res:Response): Promise<any> => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    if(!deleteUser){
      logger.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    logger.info("Delete user successfully");
    return res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    logger.error("Error for deleting user");
    res.status(500).json({ message: "Error for deleting user details" });
  }
}
export default {
  signup,
  login,
  getUsers,
  getUserDetails,
  updateUser,
  deleteUser,
}