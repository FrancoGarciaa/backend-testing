import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectDB = async () => {
try {
    await mongoose.connect(config.mongo_uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
} catch (err) {
    throw new Error("No se pudo conectar a MongoDB: " + err.message);
}
};