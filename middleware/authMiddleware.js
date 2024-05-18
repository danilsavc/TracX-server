import jwt from "jsonwebtoken";

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Користувач не авторизован" });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Користувач не авторизован" });
  }
}
