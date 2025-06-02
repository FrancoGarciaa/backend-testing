import winston from 'winston';

const customLevels = {
levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    http: 5,
},
colors: {
    fatal: 'red',
    error: 'magenta',
    warn: 'yellow',
    info: 'blue',
    debug: 'green',
    http: 'cyan',
},
};

winston.addColors(customLevels.colors);

export const logger = winston.createLogger({
levels: customLevels.levels,
transports: [
    new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    }),
],
});