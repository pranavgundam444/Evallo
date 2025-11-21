const jwt = require("jsonwebtoken");
const secret = "MY_SECRET_KEY";

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    return res.status(403).json({ msg: "Invalid token" });
  }
}

module.exports = { auth, secret };

