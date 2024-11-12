"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please add a name."]
    },
    email: {
        type: String,
        required: [true, "Please add an email."],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Please add a phone."]
    },
    password: {
        type: String,
        required: [true, "Please add a password."]
    },
    role: { type: String, default: "User" },
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
