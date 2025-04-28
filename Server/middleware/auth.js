import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const tokenWithBearer = req.header("Authorization");
  console.log("Token received:", tokenWithBearer);

  if (!tokenWithBearer) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  if (!tokenWithBearer.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid token format." });
  }

  const token = tokenWithBearer.split(" ")[1];

  try {
    const user = jwt.verify(token, "batch40");
    console.log("Decoded User:", user);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}

function adminCheck(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
}

export default { auth, adminCheck };
