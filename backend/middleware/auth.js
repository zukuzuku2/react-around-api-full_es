const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).send({ error: "No autorizado" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (e) {
    return res.status(401).send({ error: "No autorizado" });
  }
  req.user = payload;
  next();
};

module.exports = { auth };
