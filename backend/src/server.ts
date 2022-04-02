import express from 'express';

import routes from '@routes/index';
import expressErrorHandling from '@shared/errors/express-error-handling';

const app = express();

//Render image
app.use('/public', express.static('public'));

//Middlewares
require('@middlewares/index.ts')(app);

//Routes
app.use('/api', routes);

// Error handling
app.use(expressErrorHandling);

export default app;
