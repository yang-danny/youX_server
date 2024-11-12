"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApplicationController_1 = __importDefault(require("../controller/ApplicationController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/create", authMiddleware_1.protect, ApplicationController_1.default.create);
router.get("/", authMiddleware_1.protect, ApplicationController_1.default.getAllApplications);
router.get("/user/:id", authMiddleware_1.protect, ApplicationController_1.default.getUserApplications);
router.delete("/:id", authMiddleware_1.protect, ApplicationController_1.default.deleteApplication);
router.get("/:id", authMiddleware_1.protect, ApplicationController_1.default.getApplicationDetails);
router.put("/:id", authMiddleware_1.protect, ApplicationController_1.default.updateApplicationDetails);
exports.default = router;
