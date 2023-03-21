const { expect } = require("chai"),
  yml = require("js-yaml"),
  fs = require("fs"),
  base = yml.load(fs.readFileSync("./test/api/baseURL.yml")).baseURL,
  request = require("request");

describe("POST - /register", function () {
  context("register route test case", function () {
    const body = {},
      options = {
        url: `${base}profiles/register`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
    it("shoud fail with 400", (done) => {
      request.post(options, (err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.equal('{"error":"Body data is required"}');
        done();
      });
    });

    xit("should pass with 200", (done) => {
      const body = {
          first_name: "John",
          last_name: "Doe",
          email: "email@a1.test",
          password: "abc123",
        },
        options = {
          url: `${base}profiles/register`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };

      request.post(options, (err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("should fail with duplicate email", (done) => {
      const body = {
          first_name: "John",
          last_name: "Doe",
          email: "email@a1.test",
          password: "abc123",
        },
        options = {
          url: `${base}profiles/register`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };

      request.post(options, (err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
    });
  });
});

describe("GET - /login", function () {
  context("login route test cases", function () {
    it("should pass", function (done) {
      request.get(`${base}profiles/login`, (err, res) => {
        if (err) return done(err);

        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});

describe("PATCH - /updateUser/:id", function () {
  context("updateUser test cases", function () {
    it("should fail with 400", (done) => {
      const userId = "-1",
        updatedUser = {
          first_name: "Rem",
        };

      request.patch(
        {
          url: `${base}profiles/updateUser/${userId}`,
          json: updatedUser,
        },
        function (err, res) {
          if (err) return done(err);

          expect(res.statusCode).to.equal(400);
          expect(res.body).to.deep.equal({ error: "Account not found" });
          done();
        }
      );
    });

    xit("should pass with 200", (done) => {
      const userId = "1",
        updatedUser = {
          first_name: "Rem",
        };

      request.patch(
        {
          url: `${base}profiles/updateUser/${userId}`,
          json: updatedUser,
        },
        function (err, res) {
          if (err) return done(err);

          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({ success: "User updated" });
          done();
        }
      );
    });
  });
});
