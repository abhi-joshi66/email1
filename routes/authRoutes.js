const passport = require("passport");
module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/surveys");
    },
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    // req.logout((err) => {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
    //   res.send(req.user);
    // });
    req.logout();
    res.redirect("/");
  });
};
