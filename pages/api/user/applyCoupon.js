import { createRouter } from "next-connect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import nextConnect from "next-connect";
import db from "../../../utils/db";
import Cart from "@/models/Cart";
import auth from "@/middleware/auth";
import Coupon from "@/models/Coupon";

const router = createRouter();
router.use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const user = User.findById(req.user);
    const checkCoupon = await Coupon.findOne({ coupon });
    if (checkCoupon == null) {
      return res.status(400).json({ message: "Invalid coupon" });
    }
    const { cartTotal } = await Cart.findOne({ user: req.user });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await Cart.findOneAndUpdate(
      { user: req.user },
      { totalAfterDiscount },
      { new: true }
    );

    db.disconnectDb();
    res.json({ totalAfterDiscount, discount: checkCoupon.discount });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
