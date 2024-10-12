import pino from 'pino';


// Configure Pino
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    formatters: {
        level(label: string) {
            return { level: label };
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime, // ISO timestamps for Elasticsearch
});

export default logger;
