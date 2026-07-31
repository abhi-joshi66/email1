module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res
      .status(401)
      .send({
        error: "You must have at least 1 credit to perform this action!",
      });
  }

  next();
};
