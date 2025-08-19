import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const databaseConnection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connection established successfully, host: ${databaseConnection.connection.host}`);
    } catch (connectionError) {
        console.log("Database connection attempt failed in database module.", connectionError);
        process.exit(1);
    }
}

export default connectDB;