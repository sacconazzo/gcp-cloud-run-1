const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const pack = require("./package.json");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//users
const users = {
  test: "test",
  scn: "try",
};

// custom auth
const auth = (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(401);
  } else {
    req.session.calls += 1;
    next();
  }
};

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// sessions
const store = new MongoDBStore({
  uri: process.env.DB,
  databaseName: "scn",
  collection: "sessions",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 24 * 60 * 30 },
    store: store,
  })
);

// main
app.get("/", (req, res, next) => {
  res.send(`<p>${process.env.WELCOME}</p> v${pack.version}`);
});

app.post("/login", (req, res, next) => {
  if (!!users[req.body.user] && users[req.body.user] === req.body.password) {
    //req.session.regenerate(() => {
    req.session.user = req.body.user;
    if (!req.session.calls) req.session.calls = 0;
    res.sendStatus(200);
    //});
  } else {
    req.session.destroy();
    res.sendStatus(401);
  }
});

app.get("/session", auth, (req, res, next) => {
  res.json(req.session);
});

app.post("/data", auth, (req, res, next) => {
  req.session.data = req.body;
  res.sendStatus(201);
});

// Exports for testing purposes.
module.exports = app;
