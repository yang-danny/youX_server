import mongoose from "mongoose";

export interface IUser {
    name:string;
    email:string;
    phone:number;
    password:string;
    role:string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required:[true, "Please add a name."]
    },
    email: {
        type: String,
        required: [true, "Please add an email."],
        unique:true
    },
    phone: {
        type: Number,
        required: [true, "Please add a phone."]
    },
    password: {
        type: String,
        required: [true, "Please add a password."]
    },
 
    role:{type:String, default:"User"},

},{timestamps:true});

export const User = mongoose.model("User", userSchema);