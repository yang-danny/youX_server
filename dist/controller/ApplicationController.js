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
const ApplicationModel_1 = require("../models/ApplicationModel");
const logger_1 = __importDefault(require("../logger"));
// Create new application
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, type, provider, amount, income, expenses, assets, liabilities, description, status } = req.body;
        // Check  application data
        if (!user || !type || !provider || !amount || !income || !expenses || !assets || !liabilities) {
            res.status(400);
            logger_1.default.error("Please add all fields");
            throw new Error('Please add all fields');
        }
        // Create application
        const newApplication = new ApplicationModel_1.Application({
            user, type, provider, amount, income, expenses, assets, liabilities, description, status
        });
        yield newApplication.save();
        logger_1.default.info("Create application successfully");
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
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for creating new application");
        res.status(500).json({ message: "Error for creating new application" });
    }
});
// Get all applications for admin
const getAllApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all applications
        const allApplications = yield ApplicationModel_1.Application.find({}).populate('user');
        if (!allApplications) {
            logger_1.default.error("Applications not found");
            return res.status(404).json({ message: "Applications not found" });
        }
        logger_1.default.info("Get all applications successfully");
        res.status(201).json(allApplications);
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for all applications");
        res.status(500).json({ message: "Error for getting all applications" });
    }
});
// Get user's applications by user ID
const getUserApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userApplications = yield ApplicationModel_1.Application.find({ user: req.params.id }).populate('user');
        if (!userApplications) {
            logger_1.default.error("Applications not found");
            return res.status(404).json({ message: "Applications not found" });
        }
        logger_1.default.info("Get user's applications successfully");
        res.status(201).json(userApplications);
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for get user application");
        res.status(500).json({ message: "Error for getting user applications" });
    }
});
// Get user's application details by application ID
const getApplicationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create application
        const applicationDetails = yield ApplicationModel_1.Application.findById(req.params.id).populate('user');
        if (!applicationDetails) {
            logger_1.default.error("Application not found");
            return res.status(404).json({ message: "Application not found" });
        }
        logger_1.default.info("Get application details successfully");
        res.status(200).json(applicationDetails);
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for getting new application details");
        res.status(500).json({ message: "Error for getting application details" });
    }
});
// Delete application by ID 
const deleteApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteApplication = yield ApplicationModel_1.Application.findByIdAndDelete(req.params.id);
        if (!deleteApplication) {
            logger_1.default.error("Application not found");
            return res.status(404).json({ message: "Application not found" });
        }
        logger_1.default.info("Delete application successfully");
        return res.status(204).json({ message: "Applications deleted successfully" });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for deleting new application");
        res.status(500).json({ message: "Error for deleting application" });
    }
});
// Update application details by ID
const updateApplicationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, type, provider, amount, income, expenses, assets, liabilities, description, status } = req.body;
        // Check  application data
        if (!user || !type || !provider || !amount || !income || !expenses || !assets || !liabilities) {
            res.status(400);
            logger_1.default.error("Please add all fields");
            throw new Error('Please add all fields');
        }
        // Update application
        const updateApplication = yield ApplicationModel_1.Application.findByIdAndUpdate(req.params.id, req.body);
        logger_1.default.info("Update application successfully");
        res.status(200).json({
            updateApplication
        });
    }
    catch (error) {
        console.log(error);
        logger_1.default.error("Error for updating new application");
        res.status(500).json({ message: "Error for updating new application" });
    }
});
exports.default = {
    create,
    getAllApplications,
    getUserApplications,
    deleteApplication,
    getApplicationDetails,
    updateApplicationDetails,
};
