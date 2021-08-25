const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require("cors");
const app = express();
// const router = express.Router();
const port = 5000;

app.use(cors());
app.use(express.json());

// app.use(
//   basicAuth({
//     users: { admin: "supersecret" },
//   })
// );

// app.use(
//   basicAuth({
//     authorizer: (username, password) => {
//       let _username = "Miyabi";
//       let _password = "mypassword";
//     },
//   })
// );

// app.get("/", (req, res, next) => {
//   console.log("authorized");
//   res.send("authorized");
// });

// app.get("/signin", (req, res, next) => {
//   console.log("this is a signin page");
//   res.send("this is a signin page");
// });

// app.get("/version", (req, res, next) => {
//   console.log("1.0");
//   res.send("1.0");
// });

// app.get("/testName", (req, res) => {
//   res.send('{ admin: "supersecret" }');
// });

// app.post("/givemesomething", (req, res, next) => {
//   console.log(req.body);
//   console.log(JSON.stringify(req.body));
//   res.send(`I got ${req.body}`);
//   // res.send(`I got ${req.body}`);
// });

// app.listen(port, () => console.log("server started"));

app.use(
  basicAuth({
    users: { superMiyabi: "supersecret" },
    challenge: true,
    realm: "foo miyabi",
    unauthorizedResponse: (req) => {
      return `unauthorized. ip: ${req.ip}`;
    },
    authorizer: (username, password) => {
      const admin = {
        _username: "superMiyabi",
        _password: "supersecret",
      };
      const userMatches = basicAuth.safeCompare(username, admin._username);
      const passwordMatches = basicAuth.safeCompare(password, admin._password);
      if (userMatches && passwordMatches) {
        // if both match return true
        return userMatches & passwordMatches; // bitwise operator
      }
    },
  })
);

// app.get("/test-fetch-api", (req, res, next) => {
//   console.log("test");
// });

// after user gets authorized, send logiin data to the server
app.put("/signin", async (req, res, next) => {
  console.log("userinfo sent");

  // info from client
  let param = {
    username: req.body.username,
    password: req.body.password,
  };

  console.log(req);

  if (param.username === "superMiyabi" && param.password === "supersecret") {
    res.send({
      message: "SUCCESS",
      username: param.username,
      password: param.password,
    });
  }
});

app.listen(port, () => {
  console.log("server started");
});
