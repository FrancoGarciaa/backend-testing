import express from "express";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import mocksRouter from "./routes/mocks.router.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { addLogger } from "./middlewares/logger.middleware.js"; 
import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import swaggerSpecs from "../src/config/swagger.config.js";
import mongoSanitize from "express-mongo-sanitize";
import sessionsRouter from "../src/routes/sessions.router.js";
import passport, { initializePassport } from "./config/passport.config.js";
import adoptionRouter from "./routes/adoption.router.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

initializePassport();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(addLogger);

app.use(helmet());
app.use(cors());
app.use(passport.initialize());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
message: "Demasiadas peticiones desde esta IP, intenta más tarde",
});

app.use(mongoSanitize());


app.use(limiter);


app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api/adoptions", adoptionRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
