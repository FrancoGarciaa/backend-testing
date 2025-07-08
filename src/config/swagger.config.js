import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
definition: {
    openapi: "3.0.0",
    info: {
    title: "Backend API",
    version: "1.0.0",
    description: "Documentación de la API del proyecto",
    },
    components: {
    securitySchemes: {
        bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        },
    },
    },
    security: [{ bearerAuth: [] }],
},
  // Cambiar estas rutas a strings relativas
apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js"
],
};


const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;