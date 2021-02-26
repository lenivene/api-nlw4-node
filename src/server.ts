import express from "express";

const app = express();

app.get('/users', (request, response) => {
  return response.send({
    message: 'Hello World'
  })
})

app.listen(3333, () => console.log("Server is running!"))