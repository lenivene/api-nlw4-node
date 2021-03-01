import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../app";
import { createDatabaseConnection } from "../../database";

describe("Users", () => {
  let database: Connection;

  beforeAll(async () => {
    database = await createDatabaseConnection();
    await database.runMigrations();
  });

  afterAll(() => {
    database.close();
  })

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "lenivene@msn.com",
      name: "Lenivene Bezerra"
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create an user with exists email", async () => {
    const response = await request(app).post("/users").send({
      email: "lenivene@msn.com",
      name: "Lenivene Bezerra"
    });

    expect(response.status).toBe(400)
  });

  it("Should not be able to continue if not validated the email", async () => {
    const response = await request(app).post("/users").send({
      email: "email@notValid",
      name: "Lenivene Bezerra"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toBe('Insira um email válido.');
  });
})