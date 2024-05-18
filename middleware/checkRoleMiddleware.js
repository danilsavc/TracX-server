import jwt from "jsonwebtoken";

export default function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Користувач не авторизован" });
      }

      const decoded = jwt.verify(token, process.env.SECRETKEY);
      console.log(decoded.roleName);

      const hasAccess = roles.some((role) => decoded.roleName.includes(role));

      if (!hasAccess) {
        return res.status(403).json({ message: "Немає доступа" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Користувач не авторизован" });
    }
  };
}
