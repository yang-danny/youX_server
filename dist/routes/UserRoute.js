"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/signup", UserController_1.default.signup);
router.post("/login", UserController_1.default.login);
router.get("/users", authMiddleware_1.protect, UserController_1.default.getUsers);
router.get("/:id", authMiddleware_1.protect, UserController_1.default.getUserDetails);
router.put("/update/:id", authMiddleware_1.protect, UserController_1.default.updateUser);
router.delete("/:id", authMiddleware_1.protect, UserController_1.default.deleteUser);
exports.default = router;
