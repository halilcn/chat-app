import './pre-start';

import server from './server';
import logger from '@shared/logger';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  logger.info(`Express server started on port ${port}`);
});
