import jwt from "jsonwebtoken";

//-------------------
// AUTHENTICATION
//-------------------

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Access token is required",
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred during token validation",
    });
  }
};

//-------------------
// AUTHORIZE
//-------------------

const authorize = (permission) => {
  return (req, res, next) => {
    db.execute(
      "SELECT p.permission_name FROM permissions p JOIN user_permissions up ON p.id = up.permission_id WHERE up.user_id = ?",
      [req.userId],
      (err, results) => {
        if (err) return res.status(500).send("Database error");

        const userPermissions = results.map((row) => row.permission_name);

        if (userPermissions.includes(permission)) {
          return next();
        } else {
          return res.status(403).send("Forbidden: Insufficient permissions");
        }
      }
    );
  };
};
