import winston from "winston";

const customLogger = winston.createLogger({
level: "info",
transports: [
    new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    )
    }),
    new winston.transports.File({
    filename: "logs/errors.log",
    level: "error",
    format: winston.format.json()
    })
]
});

export const loggerMiddleware = (req, res, next) => {
req.logger = customLogger;
req.logger.info(`${req.method} ${req.url}`);
next();
};

export default customLogger;
