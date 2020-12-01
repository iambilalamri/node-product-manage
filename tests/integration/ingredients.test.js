describe('GET /', () => {
    it('should return all ingredients', () => {
        
    });
});

// describe("POST /", () => {
//     // Define the happy path, and then in each test, we change
//     // one parameter that clearly aligns with the name of the test.

//     it("should return 401 if client is not logged", async () => {
//       const res = await request(server).post("/api/comments").send({
//         libelle: "Comment4",
//         value: "10",
//         description: "description 4",
//       });
//       expect(res.status).toBe(401);
//     });

//     it("should return 400 if genre is invalid", async () => {
//       const token = new User().generateAuthToken();
//       // new Array(52).join("a") = 50*a
//       const res = await request(server)
//         .post("/api/comments")
//         .set("x-auth-token", token)
//         .send({
//           libelle: "Com",
//           value: "10",
//           description: "description 4",
//         });

//       expect(res.status).toBe(400);
//     });

//     it("should save genre if it is valid", async () => {
//       const token = new User().generateAuthToken();
//       const res = await request(server)
//         .post("/api/comments")
//         .set("x-auth-token", token)
//         .send({
//           libelle: "Comment t7",
//           value: "11",
//           description: "description t7",
//         });

//       const comment = await Comment.find({
//         libelle: "Comment t7",
//         value: "11",
//         description: "description t7",
//       });
//       expect(comment).not.toBeNull();
//     });

//     it("should return genre if it is valid", async () => {
//       const token = new User().generateAuthToken();
//       const res = await request(server)
//         .post("/api/comments")
//         .set("x-auth-token", token)
//         .send({
//           libelle: "Comment t7",
//           value: "11",
//           description: "description t7",
//         });

//       expect(res.body).toHaveProperty("_id");
//       expect(res.body).toHaveProperty("libelle", "Comment t7");
//     });
//   });