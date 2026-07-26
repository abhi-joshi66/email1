// const requireLogin = require("../middlewares/requireLogin");
// const requireCredits = require("../middlewares/requireCredits");
const stripe = require("stripe")(require("../config/keys").stripeSecretKey);

// module.exports = (app) => {
//   app.post("/api/stripe", requireLogin, requireCredits, async (req, res) => {
//     const charge = await stripe.charges.create({
//       amount: 500,
//       currency: "usd",
//       description: "$5 for 5 email credits",
//       source: req.body.id,
//     });

//     req.user.credits += 5;
//     const user = await req.user.save();

//     res.send(user);
//   });
// };

module.exports = (app) => {
  //   app.post("/api/stripe",requireLogin,requireCredits , async (req, res) => {
  app.post("/api/stripe", async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      payment_method_data: {
        type: "card",
        card: {
          token: req.body.id,
        },
      },
      confirmation_method: "manual",
      confirm: "true",
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
