import "reflect-metadata";
import express from "express";
import { createDatabaseConnection } from "./database";
import { router } from "./routes";

createDatabaseConnection();
const app = express();

app.use(express.json())
app.use(router);

app.get('/', (request, response) => {
  return response.send({
    message: 'Hello World'
  })
})

export { app };