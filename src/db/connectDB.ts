import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!)
    .then(()=>console.log('Connected to MongoDB...'))
    .catch((e) => console.log(e));
}
export default connectDB;