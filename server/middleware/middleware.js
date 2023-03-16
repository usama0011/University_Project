import jwt from "jsonwebtoken";
const checkUserToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, "893u49u9ju8r93u4");
    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid access token" });
  }
};

const checkAdminToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "893u49u9ju8r93u4");
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    if (!userId || !isAdmin) {
      return res.status(401).json({ message: "Invalid admin token" });
    } else {
      req.user = { userId, isAdmin };
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { checkUserToken, checkAdminToken };
