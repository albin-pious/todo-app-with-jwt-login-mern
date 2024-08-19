import path from "path";
import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'DD/MM/YYYY HH:MM:SS'}),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        // Write all logs with level 'info' and below to 'combined.log'
        new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
        // Write all logs with level `error` and below to `error.log`
        new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' })
    ]
})

// If we're not in production then log to the console with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

export default logger;