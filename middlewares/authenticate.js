const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError({
        message: "unauthenticated",
        statusCode: 401,
      });
    }
    const accessToken = authorization.split(" ")[1];
    const payload = jwtService.verify(accessToken);

    const user = await userService.findUserById(payload.id);
    if (!user) {
      createError({
        message: "user was not found",
        statusCode: 400,
      });
    }
    delete user.password;

    req.user = user;
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate