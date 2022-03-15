import express from 'express';

import routes from '@routes/index';
import expressErrorHandling from '@shared/errors/express-error-handling';

const app = express();

//Middlewares
require('@middlewares/index.ts')(app); //todo:!

//Routes
app.use('/api', routes);

// Error handling
app.use(expressErrorHandling);

export default app;
