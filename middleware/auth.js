import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).send("No token provided");
    }

    const decoded = jwt.verify(token, "cp24nw1secret");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid or expired token");
  }
};
