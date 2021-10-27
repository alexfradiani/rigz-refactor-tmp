import app from "../app";
import request from "supertest";

describe("basic test", () => {
  it("loads the app", async () => {
    const response = await request(app).get("/loads/test");
    expect(response.body).toEqual({ ok: "ok" });
  });
});
