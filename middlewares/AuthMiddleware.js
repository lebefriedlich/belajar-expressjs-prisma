// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const prisma = require("../utils/PrismaClient");

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status_code: 401,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!req.user) {
      return res.status(401).json({
        status_code: 401,
        message: "User not found",
      });
    }

    next();
  } catch (err) {
    res.status(401).json({
      status_code: 401,
      message: "Invalid token",
    });
  }
};
