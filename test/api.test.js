import request from "supertest";
import { app, db } from "../app";

beforeAll(async () => {
  db.data ||= { notes: [] };
  db.write();
});

afterAll(async () => {
  db.data.notes = [];
  db.write();
});

describe("Test POST notes /", () => {
  const note = {
    title: "Aawis",
    description: "lajdlfjldjfljflj",
  };
  const noteMissingProperties = {
    title: "note",
    // description: "lajdlfjldjfljflj"
  };
  const noteMissingProperties2 = {
    // title: "Aawis",
    description: "lajdlfjldjfljflj",
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/note")
      .send(note)
      .expect("Content-Type", /json/)
      .expect(201);

    //   const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    //   const responseDate = new Date(response.body.launchDate).valueOf();
    //   expect(responseDate).toBe(requestDate);

    //   expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required propertieties Title", async () => {
    const response = await request(app)
      .post("/note")
      .send(noteMissingProperties)
      .expect("Content-Type", /json/)
      .expect(422);
  });
  test("It should catch missing required properties description", async () => {
    const response = await request(app)
      .post("/note")
      .send(noteMissingProperties2)
      .expect("Content-Type", /json/)
      .expect(422);
  });
});
describe("Test GET notes /", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test PUT notes /", () => {
  const note = {
    title: "Aawis",
    description: "lajdlfjldjfljflj",
  };

  test("It should respond with 200 ", async () => {
    const response = await request(app)
      .post("/note")
      .send(note)
      .expect("Content-Type", /json/)
      .expect(201);

    const changed = await request(app)
      .put(`/note/${response.body.id}`)
      .send(note)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Test Delete notes /", () => {
  const note = {
    title: "Aawis",
    description: "lajdlfjldjfljflj",
  };

  test("It should respond with 200 ", async () => {
    const response = await request(app)
      .post("/note")
      .send(note)
      .expect("Content-Type", /json/)
      .expect(201);

    const deleted = await request(app)
      .delete(`/note/${response.body.id}`)
      .expect("Content-Type", /json/)
      .expect(202);
  });
});
