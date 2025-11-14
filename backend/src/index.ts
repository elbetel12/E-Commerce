import { app } from './app'
import { logger } from './logger'
import mongoose from 'mongoose';

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', reason => logger.error('Unhandled Rejection %O', reason))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})

mongoose.connection.once('open', () => {
  logger.info('✅ Connected to MongoDB (Mongoose)');
});
