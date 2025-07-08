## backend-testing
Proyecto backend con Node.js, Express y MongoDB para manejar usuarios, mascotas y adopciones.
Incluye autenticación con JWT, documentación con Swagger y tests básicos.
También está dockerizado para facilitar su ejecución.

## Tecnologías usadas
Node.js
Express
MongoDB (Mongoose)
Passport + JWT
Swagger (documentación API)
Mocha, Chai, Supertest (tests)
Docker
Seguridad: Helmet, CORS, sanitización con mongo-sanitize, rate limiting

## Dependencias principales

"bcrypt", "cookie-parser", "cors", "dotenv", "express", "express-compression", "express-handlebars", "express-mongo-sanitize", "express-rate-limit", "helmet", "jsonwebtoken", "mongoose", "passport", "passport-jwt", "swagger-jsdoc", "swagger-ui-express", "winston"
## Dependencias para desarrollo
"assert", "chai", "chai-http", "mocha", "mongodb-memory-server", "supertest"

## Cómo levantar el docker

Con Docker (asegurate de tener Docker instalado):

docker-compose up --build
La API quedará corriendo en:

http://localhost:3131/api/docs

## imagen de docker a dockerhub

https://hub.docker.com/layers/franq12/backend-testing/latest/images/sha256-0cf5a5bb19290a81eda059ce5ea6d8bd4b5ce8eda065e553657bbbaafbcce969

## Cómo correr los tests

npx mocha ./src/tests/**/*.test.js --timeout 10000 --exit

## Documentación (Swagger)
Disponible en:

http://localhost:3131/api/docs

## Endpoints importantes
POST /api/sessions/register — Registrar usuario nuevo

POST /api/sessions/login — Login y obtención de token JWT

GET /api/users/current — Datos del usuario logueado

GET /api/users — Lista de usuarios

GET /api/mocks/mockingusers — Genera usuarios de prueba

GET /api/mocks/generateData — Genera usuarios y mascotas falsos

## Seguridad implementada

Helmet para cabeceras seguras

CORS configurado para evitar problemas de origen

Sanitización de inputs para prevenir inyección (mongo-sanitize)

Rate limiting para limitar peticiones por IP

Autenticación con JWT

Validación de datos al registrar usuarios
