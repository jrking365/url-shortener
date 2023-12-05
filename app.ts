import express, {json, urlencoded} from 'express';
import swaggerUi from "swagger-ui-express";
import config from 'config';
import { ValidateError } from 'tsoa';
import logger from './src/core-utils/logger';
import { RegisterRoutes } from './src/routes/routes';

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof ValidateError) {
    res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  } else {
    next(err);
  }
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => logger.info(`Express is listening at http://localhost:${config.service.port}`));