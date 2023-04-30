import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: './' })

const database = async () => {
    await mongoose.connect(process.env.MONGO_URI);
}

export default database;