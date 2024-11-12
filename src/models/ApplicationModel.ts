import mongoose from "mongoose";

export interface IApplication {
    user:mongoose.Schema.Types.ObjectId;
    type:string;
    provider:string;
    amount:number;
    income:number;
    expenses:number;
    assets:number;
    liabilities:number;
    description:string;
    status: "pending" | "auditing" | "approved" | "reject" | "withdraw";
}

const applicationSchema = new mongoose.Schema<IApplication>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required:[true, "Please add a type."]
    },
    provider: {
        type: String,
        required:[true, "Please add a provider."]
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
    description:{
        type:String,
      },
    status: {
        type: String,
        enum: ["pending", "auditing", "approved", "reject", "withdraw"],
      },
},{timestamps:true});

export const Application = mongoose.model("Application", applicationSchema);