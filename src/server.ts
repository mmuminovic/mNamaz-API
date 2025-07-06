import { config } from './config/env';
import logger from './config/logger';
import { initApp } from './app';

const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  
  process.exit(0);
};

const startServer = async () => {
  try {
    const app = await initApp();
    
    const server = app.listen(config.port, config.host, () => {
      logger.info(`Server running on ${config.host}:${config.port} in ${config.env} mode`);
      logger.info(`API available at: http://${config.host}:${config.port}${config.api.prefix}/${config.api.version}`);
    });

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    server.on('error', (error: any) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof config.port === 'string' ? 'Pipe ' + config.port : 'Port ' + config.port;

      switch (error.code) {
        case 'EACCES':
          logger.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

export { startServer };