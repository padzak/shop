import { createRouter } from "next-connect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import nextConnect from "next-connect";
import db from "../../../utils/db";
import Cart from "@/models/Cart";
import auth from "@/middleware/auth";

const router = createRouter();
router.use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const user = User.findById(req.user);
    await user.updateOne({
      $push: {
        addresses: address,
      },
    });
    res.json(address);
    db.disconnectDb();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
