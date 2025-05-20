import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const {
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DB_NAME,
  } = process.env;

const connectDB = async () => {
    try {
        const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
    
        await mongoose.connect(MONGO_URI)

        console.log("Conectado a MongoDB");
        
    } catch (error) {
        console.error("Error al conectar a MongoDB: ", error);
        process.exit(1);      
    }
};

export default connectDB;