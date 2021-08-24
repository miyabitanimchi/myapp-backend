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

app.get("/", (req, res, next) => {
  console.log("authorized");
  res.send("authorized");
});

app.get("/version", (req, res, next) => {
  console.log("1.0");
  res.send("1.0");
});

app.get("/testName", (req, res) => {
  res.send('{ admin: "supersecret" }');
});

app.post("/givemesomething", (req, res, next) => {
  console.log(req.body);
  console.log(JSON.stringify(req.body));
  res.send(`I got ${req.body}`);
  // res.send(`I got ${req.body}`);
});

app.listen(port, () => console.log("server started"));
