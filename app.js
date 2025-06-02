import express from "express";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import { config } from "./src/config/env.config.js";
import { connectDB } from "./src/config/db.js";
import usersRouter from "./src/routes/users.router.js";
import petsRouter from "./src/routes/pets.router.js";
import mocksRouter from "./src/routes/mocks.router.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { addLogger } from "./src/middlewares/logger.middleware.js"; 
import { notFoundHandler } from "./src/middlewares/notFound.middleware.js";
import exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = config.port || 3131;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './src/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(addLogger);

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/mocks", mocksRouter);

app.use(errorHandler);
app.use(notFoundHandler);

const Server = async () => {
try {
    await connectDB();
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    });
} catch (error) {
    console.error("Error conectando a la base de datos:", error);
}
};

Server();

export default app;