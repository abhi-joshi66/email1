const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  mongoose
    .model("users")
    .findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "http://localhost:5000/auth/google/callback"
          : "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("Profile:", profile);

      const User = mongoose.model("users");
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // User already exists
          done(null, existingUser);
        } else {
          // Create a new user
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    },
  ),
);
