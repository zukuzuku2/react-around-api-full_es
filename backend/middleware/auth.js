const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).send({ error: "No autorizado" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    const err = new Error("No autorizado");
    err.statusCode = 401;
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = { auth };
