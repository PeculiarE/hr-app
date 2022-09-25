/* eslint-disable max-lines-per-function */
import winston from 'winston';
import fs from 'fs';
import config from './env';

const { combine, label, timestamp, colorize, printf } = winston.format;

const { rootPath, NODE_ENV } = config;

const getLogToProcess = (fileOpt, consoleOpt) => {
  const array = [];
  array.push(
    new winston.transports.File(fileOpt),
    new winston.transports.Console(consoleOpt)
  )
  return array;
};

class Logger {
  constructor(options) {
    this.logDir = options.logDirPath || `${rootPath}/logs`;
    this.label = options.label || 'log';
    this._commonOptions = {
      console: {
        level: 'debug',
        handleExceptions: true,
        format: combine(
          colorize({ all: true }),
          printf(
            (msg) => `[${new Date(msg.timestamp).toUTCString()}]: ${msg.label} : - ${
              msg.level
            }: ${msg.message}`
          )
        )
      },
      file: {
        level: 'debug',
        filename: `${this.logDir}/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 2000,
        format: winston.format.json()
      }
    };
    this.debugMode = options.debugMode === true || options.debugMode === undefined;
    this.environment = NODE_ENV || 'development';
  }

  _getTransports() {
    const { console, file } = this._commonOptions;
    let level = this.debugMode ? 'debug' : 'info';
    if (this.environment === 'production' && this.debugMode) level = 'error';
    const consoleOpt = { ...console, level };
    const fileOpt = {
      ...file,
      filename: `${this.logDir}/app.${this.environment}.log`
    };
    return getLogToProcess(fileOpt, consoleOpt);
  }

  init() {
    if (!fs.existsSync(this.logDir)) fs.mkdirSync(this.logDir);
    const logger = winston.createLogger({
      format: combine(
        timestamp(),
        label({
          label: this.label
        })
      ),
      transports: this._getTransports(),
      exitOnError: false
    });
    logger.stream = {
      write(message) {
        logger.info(message);
      }
    };
    return logger;
  }

  static createLogger(options) {
    const loggerInstance = new Logger(options);
    return loggerInstance.init();
  }
}
export default Logger;
