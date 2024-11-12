"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const applicationSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: [true, "Please add a type."]
    },
    provider: {
        type: String,
        required: [true, "Please add a provider."]
    },
    amount: {
        type: Number,
        required: [true, "Please add amount."]
    },
    income: {
        type: Number,
        required: [true, "Please add income."]
    },
    expenses: {
        type: Number,
        required: [true, "Please add expenses."]
    },
    assets: {
        type: Number,
        required: [true, "Please add assets."]
    },
    liabilities: {
        type: Number,
        required: [true, "Please add liabilities."]
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "auditing", "approved", "reject", "withdraw"],
    },
}, { timestamps: true });
exports.Application = mongoose_1.default.model("Application", applicationSchema);
