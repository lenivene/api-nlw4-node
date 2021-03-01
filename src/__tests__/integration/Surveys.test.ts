import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../app";
import { createDatabaseConnection } from "../../database";

describe("Surveys", () => {
  let database: Connection;

  beforeAll(async () => {
    database = await createDatabaseConnection();
    await database.runMigrations();
  });

  afterAll(() => {
    database.close();
  });

  it("Should be able to create a new surveys", async () => {
    const data = {
      title: "Lorem ipsum",
      description: "Reprehenderit Lorem magna incididunt irure elit incididunt mollit tempor."
    };

    const response = await request(app).post("/surveys").send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toBe(data.title);
  });

  it("Should be able to show an array with multiples surveys", async () => {
    const response = await request(app).get("/surveys").send();

    expect(response.status).toBe(200);
  })
})