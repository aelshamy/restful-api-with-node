import cors from 'cors';
import express from 'express';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';

export default server => {
  // apply CORS
  server.use(cors());
  // apply HTTP secruity headers
  server.use(helmet());

  // apply basic authentication - check req Authentication header
  server.use(
    basicAuth({
      users: {
        admin: 'supersecret'
      },
      challenge: true
    })
  );
  //handle request JSON body - no need to user body-parser lib anymore
  server.use(express.json());
};
