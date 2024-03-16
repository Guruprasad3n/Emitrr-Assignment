const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json("No Authorization Key");
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;
    req.currentUser = userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token Not Valid", error });
  }
};

module.exports = { verifyToken };
