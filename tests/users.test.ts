import request from "supertest";
import { server } from "../app";

describe("GET /api/users", () => {
  it("should return a non-empty array of users", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/users", () => {
  it("should create a new user object", async () => {
    const userData = {
      username: "testuser",
      age: 25,
      hobbies: ["reading", "coding"],
    };

    const response = await request(server).post("/api/users").send(userData);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.username).toEqual(userData.username);
    expect(response.body.age).toEqual(userData.age);
    expect(response.body.hobbies).toEqual(userData.hobbies);
  });
});

describe("GET /api/user/{userId}", () => {
  it("should return the created user object by its id", async () => {
    const newUser = {
      username: "testuser",
      age: 25,
      hobbies: ["reading", "coding"],
    };

    const createUserResponse = await request(server)
      .post("/api/users")
      .send(newUser);

    expect(createUserResponse.status).toEqual(201);
    expect(createUserResponse.body).toHaveProperty("id");

    const userId = createUserResponse.body.id;

    const getUserResponse = await request(server).get(`/api/users/${userId}`);

    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body).toHaveProperty("id", userId);
  });
});
