import cors from 'cors';
import Express from 'express';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';

export class ServerConfig {
  #userAccounts = {
    admin: 'supersecret2'
  };

  constructor({ port, middlewars, routers }) {
    this.app = Express();
    this.app.set('env', process.env.NODE_ENV);
    this.app.set('port', port);
    this.registerCORSMiddleware()
      .registerHelmetMiddleware()
      .registerBasicAuthMiddleware()
      .registerJSONMiddleware();

    middlewars &&
      middlewars.forEach(mdlwr => {
        this.registerMiddleware(mdlwr);
      });

    routers &&
      routers.forEach(({ baseUrl, router }) => {
        this.registerRouter(baseUrl, router);
      });

    this.app.get('/', (_, res) => {
      res.json({ message: 'Server working...' });
    });

    this.registerMiddleware((_, __, next) => {
      const error = new Error('Not Found');
      error.StatusCode = 404;
      next(error);
    });

    this.registerErrorHandlingMiddleware();
  }

  get port() {
    return this.app.get('port');
  }

  set port(number) {
    this.app.set('port', number);
  }

  registerCORSMiddleware() {
    this.registerMiddleware(cors());
    return this;
  }

  registerHelmetMiddleware() {
    this.registerMiddleware(helmet());
    return this;
  }

  registerBasicAuthMiddleware() {
    this.registerMiddleware(
      basicAuth({
        users: this.#userAccounts,
        challenge: true
      })
    );
    return this;
  }

  registerJSONMiddleware() {
    this.registerMiddleware(Express.json());
    return this;
  }

  registerErrorHandlingMiddleware() {
    this.app.get('env') === 'development'
      ? this.registerMiddleware(({ statusCode, message, stack }, _, res) => {
          res.status(status);
          res.json({
            statusCode,
            message,
            stack
          });
        })
      : this.registerMiddleware(({ statusCode, message }, _, res) => {
          res.status(status);
          res.json({
            statusCode,
            message
          });
        });
    return this;
  }

  registerMiddleware(middleware) {
    this.app.use(middleware);
    return this;
  }

  registerRouter(baseUrl, router) {
    this.app.use(baseUrl, router);
    return this;
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port: ${this.port}`);
    });
  }
}
