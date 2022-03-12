import './pre-start'; // Must be the first import

import server from './server';

const port = (process.env.PORT || 3000);

server.listen(port, () => {
    console.info('Express server started on port: ' + port);
});
