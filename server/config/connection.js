import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
    .connect(process.env.MONGODB_URI);
const connection = mongoose.connection;
export default connection;
