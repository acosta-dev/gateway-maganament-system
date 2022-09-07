import app from "../app.js";
import request from "supertest";

describe("Gateways", () => {
  it("GET /gateways -> Array of Gateways", async () => {
    return await request(app)
      .get("/gateways")
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              uid: expect.any(String),
              name: expect.any(String),
              ipv4: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /gateways/id -> Specific Gateway by ID", async () => {
    return await request(app)
      .get("/gateways/63180c00b77c20058fa7b14b")
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            gateway: expect.any(Object, {
              _id: expect.any(String),
              uid: expect.any(String),
              name: expect.any(String),
              ipv4: expect.any(String),
              __v: expect.any(Number),
            }),
            peripheral: expect.any(Array, {
              _id: expect.any(String),
              uid: expect.any(Number),
              vendor: expect.any(String),
              created_date: expect.any(String),
              status: expect.any(Boolean),
              gateway: expect.any(String),
              __v: expect.any(Number),
            }),
          })
        );
      });
  });
  
});
