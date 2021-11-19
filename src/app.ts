import createServer from './utils/createServer';

const server = createServer();

const port = 4000;

server.listen(port, () => console.log(`Running on port ${port}`));
