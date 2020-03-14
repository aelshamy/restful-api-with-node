import { server } from './config';
import registerMiddlewares from './middlewares';
import { rootRouter } from './routes';

async function main() {
  registerMiddlewares(server);

  server.all('/', (req, res) => res.redirect('/v1'));
  server.use('/v1', rootRouter);

  server.listen();
}
main();
