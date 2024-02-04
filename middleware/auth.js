import { getToken } from "next-auth/jwt";

export default async (req, res, next) => {
    try {
      const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
      });
      if (token) {
        req.user = token.sub;
        next();
      } else {
        return res.status(401).json({ message: "You are not authenticated" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
