import SuperTest, {Test} from "supertest";
import { Connection } from "typeorm";
import { app } from "../../app";
import { createDatabaseConnection } from "../../database";

describe("Users", () => {
  let database: Connection;
  let server: SuperTest.SuperTest<Test>;

  beforeAll(async () => {
    database = await createDatabaseConnection();
    await database.runMigrations();

    server = await SuperTest(app);
  });

  afterAll(() => {
    database.close();
  })

  it("Should be able to create a new user", async () => {
    const response = await server.post("/users").send({
      email: "lenivene@msn.com",
      name: "Lenivene Bezerra"
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create an user with exists email", async () => {
    const response = await server.post("/users").send({
      email: "lenivene@msn.com",
      name: "Lenivene Bezerra"
    });

    expect(response.status).toBe(400)
  });
})