const { createLogger, format, transports } = require('winston');
const path = require('path');

const logDir = path.join(process.cwd(), 'logs');
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' })
  ]
});

logger.success = (msg) => logger.info(`SUCCESS: ${msg}`);
logger.command = (msg) => logger.info(`COMMAND: ${msg}`);

module.exports = logger;
