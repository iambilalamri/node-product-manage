const request = require("supertest");
const mongoose = require("mongoose");
const { Comment } = require("./../../models/comment");
const { User } = require("./../../models/user");
let server;

describe("/api/comments", () => {
  beforeEach(() => {
    server = require("./../../index.js");
  });

  afterEach(async () => {
    server.close();
    await Comment.remove({});
  });

  describe("GET /", () => {
    it("should return all comments", async () => {
      await Comment.collection.insertMany([
        {
          libelle: "Comment3",
          value: "2",
          description: "description 3",
        },
        {
          libelle: "Comment4",
          value: "10",
          description: "description 4",
        },
      ]);
      const res = await request(server).get("/api/comments");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((c) => c.libelle == "Comment3")).toBeTruthy();
      expect(res.body.some((c) => c.libelle == "Comment4")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a comment if valid id is passed", async () => {
      const comment = new Comment({
        libelle: "Comment4",
        value: "10",
        description: "description 4",
      });
      await comment.save();
      const res = await request(server).get("/api/comments/" + comment._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("libelle", comment.libelle);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/comments/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if no genre with the given id exists", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/api/comments/" + id);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the test.
    let token;
    let libelle;

    const exec = async () => {
      return await request(server)
        .post("/api/comments")
        .set("x-auth-token", token)
        .send({
          libelle: libelle,
          value: "19",
          description: "description 9",
        });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      libelle = "comment9";
    });

    it("should return 401 if client is not logged", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is invalid", async () => {
      libelle = "comm";
      // new Array(52).join("a") = 50*a
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save genre if it is valid", async () => {
      await exec();

      const comment = await Comment.find({
        libelle: "Comment t7",
        value: "11",
        description: "description t7",
      });
      expect(comment).not.toBeNull();
    });

    it("should return genre if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("libelle", "comment9");
    });
  });
});
