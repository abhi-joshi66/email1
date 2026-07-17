const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/user");
require("./services/passport");
const keys = require("./config/keys");

mongoose
  .connect(keys.mongoURI, {
    ssl: true,
    retryWrites: true,
    w: "majority",
    maxPoolSize: 5,
    minPoolSize: 2,
    maxIdleTimeMS: 45000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);

// app.use(
//   session({
//     secret: keys.cookieKey,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
//   }),
// );

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
