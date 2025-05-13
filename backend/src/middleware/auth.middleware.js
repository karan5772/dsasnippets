import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMwiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - token not provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid Token",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        name: true,
        email: true,
        id: true,
        role: true,
        image: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error authentacing user : ${error}`);
    return res.status(401).json({
      success: false,
      message: "Error authentacing user",
    });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access Denied - Admins only",
      });
    }
    next();
  } catch (error) {
    console.log("Error checking Admin role:", error);
    return res.status(500).json({
      message: "Error checking Admin role",
      success: false,
    });
  }
};
