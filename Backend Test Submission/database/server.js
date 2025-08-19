import mongoose from "mongoose";
import Log from "../utils/Logging.mjs";

const connectDB = async () => {
    try {
        const databaseConnection = await mongoose.connect(process.env.MONGODB_URI);
        await Log("backend", "info", "database", `Database connection established successfully, host: ${databaseConnection.connection.host}`);
        console.log(`Database connection established successfully, host: ${databaseConnection.connection.host}`);
    } catch (connectionError) {
        await Log("backend", "error", "database", `Database connection attempt failed: ${connectionError.message}`);
        console.log("Database connection attempt failed in database module.", connectionError);
        process.exit(1);
    }
};

export default connectDB;