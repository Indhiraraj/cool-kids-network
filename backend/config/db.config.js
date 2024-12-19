import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const uri = process.env.MONGO_DB_URI;
const databaseName = "CoolKidsNetwork";

const connectToDatabase = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(uri, {
                dbName: databaseName,
                maxPoolSize: 10,
                minPoolSize: 5,
            });
            console.log(`Connected to MongoDB database: ${databaseName}`);      
        }
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        throw error;
    }
};

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
})

export default connectToDatabase;