import { Request, Response } from "express";
import { Application } from "../models/ApplicationModel";
import logger from "../logger";
  // Create new application
  const create = async (req: Request, res: Response) => {
    try {
      const {user,  type, provider, amount, income, expenses, assets, liabilities, description, status} = req.body;
      // Check  application data
      if (!user || !type || !provider || !amount || !income|| !expenses|| !assets || !liabilities) {
        res.status(400)
        logger.error("Please add all fields");
        throw new Error('Please add all fields')
      }

      // Create application
      const newApplication = new Application({
        user, type, provider, amount, income, expenses, assets, liabilities, description, status
      });
      await newApplication.save();
      logger.info("Create application successfully");
      res.status(201).json({
        _id: newApplication.id,
        user: newApplication.user,
        type: newApplication.type,
        provider: newApplication.provider,
        amount: newApplication.amount,
        income: newApplication.income,
        expenses: newApplication.expenses,
        assets: newApplication.assets,
        liabilities: newApplication.liabilities,
        description: newApplication.description,
        status: newApplication.status,
      });
    } catch (error) {
      console.log(error);
      logger.error("Error for creating new application");
      res.status(500).json({ message: "Error for creating new application" });
    }
  };
  // Get all applications for admin
  const getAllApplications = async (req: Request, res: Response): Promise<any> => {
    try {
 
      // Get all applications
      const allApplications = await Application.find({}).populate('user');
      if(!allApplications){
        logger.error("Applications not found");
        return res.status(404).json({ message: "Applications not found" });
      }
      logger.info("Get all applications successfully");
      res.status(201).json(allApplications);
    } catch (error) {
      console.log(error);
      logger.error("Error for all applications");
      res.status(500).json({ message: "Error for getting all applications" });
    }
  };
  // Get user's applications by user ID
  const getUserApplications = async (req: Request, res: Response): Promise<any> => {
    try {
      const userApplications = await Application.find({user:req.params.id}).populate('user');
      if(!userApplications){
        logger.error("Applications not found");
        return res.status(404).json({ message: "Applications not found" });
      }
      logger.info("Get user's applications successfully");
      res.status(201).json(userApplications);
    } catch (error) {
      console.log(error);
      logger.error("Error for get user application");
      res.status(500).json({ message: "Error for getting user applications" });
    }
  };
  // Get user's application details by application ID
  const getApplicationDetails = async (req: Request, res: Response): Promise<any> => {
    try {
 
      // Create application
      const applicationDetails = await Application.findById(req.params.id).populate('user');
      if(!applicationDetails){
        logger.error("Application not found");
        return res.status(404).json({ message: "Application not found" });
      }
      logger.info("Get application details successfully");
      res.status(200).json(applicationDetails);
    } catch (error) {
      console.log(error);
      logger.error("Error for getting new application details");
      res.status(500).json({ message: "Error for getting application details" });
    }
  };
  // Delete application by ID 
  const deleteApplication = async (req: Request, res: Response): Promise<any> => {
    try {

      const deleteApplication = await Application.findByIdAndDelete(req.params.id);
      if(!deleteApplication){
        logger.error("Application not found");
        return res.status(404).json({ message: "Application not found" });
      }
      logger.info("Delete application successfully");
      return res.status(204).json({ message: "Applications deleted successfully" });
    } catch (error) {
      console.log(error);
      logger.error("Error for deleting new application");
      res.status(500).json({ message: "Error for deleting application" });
    }
  };
  // Update application details by ID
  const updateApplicationDetails = async (req: Request, res: Response) => {
    try {

      const {user,  type, provider, amount, income, expenses, assets, liabilities, description, status} = req.body;
      // Check  application data
      if (!user || !type || !provider || !amount || !income|| !expenses|| !assets || !liabilities) {
        res.status(400)
        logger.error("Please add all fields");
        throw new Error('Please add all fields')
      }

      // Update application
      const updateApplication = await Application.findByIdAndUpdate(req.params.id, req.body);
      logger.info("Update application successfully");
      res.status(200).json({
        updateApplication
      });
    } catch (error) {
      console.log(error);
      logger.error("Error for updating new application");
      res.status(500).json({ message: "Error for updating new application" });
    }
  };

  export default {
    create,
    getAllApplications,
    getUserApplications,
    deleteApplication,
    getApplicationDetails,
    updateApplicationDetails,
  }