import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/UserModel"
import asyncHandler from 'express-async-handler'
import logger from "../logger";

interface JwtPayload {
    _id: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
  
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
  
        // Get user from the token
        req!.user = await User.findById(decoded._id).select('-password')
  
        next()
      } catch (error) {
        console.log(error)
        logger.error("User not authenticated");
        return res.status(500).json({
            message: "User not authenticated"
        })
      }
    }
  
    if (!token) {
      logger.error("Can not found a user token");
        return res.status(401).json({
            success: false,
            message: "Can not found a user token"
        });
    }
})