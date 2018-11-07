var appRoot = require('app-root-path');
import * as winston from 'winston'

class Logger {
    public logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: appRoot.path + '/logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: appRoot.path + '/logs/combined.log' })
            ]
        });
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }));
        }

    }

    write(text: String) {
        this.logger.info(text);
    }
}


export const appLogger = new Logger();