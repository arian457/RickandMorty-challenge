import server from './app';

const port = 4000;

server.listen(port, () => console.log(`Running on port ${port}`));
