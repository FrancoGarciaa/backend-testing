import app from "./src/app.js";
import { config } from "./src/config/env.config.js";
import { connectDB } from "./src/config/db.js";

const PORT = config.port || 3131;

const startServer = async () => {
try {
    await connectDB();
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    });
} catch (error) {
    console.error("Error conectando a la base de datos:", error);
}
};

startServer();