import express from 'express';
import swaggerUi from "swagger-ui-express";
import config from 'config';

const app = express();
const port = 3000;


app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Express is listening at http://localhost:${config.service.port}`));