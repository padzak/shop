import { createRouter } from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
const router = createRouter();
router.use(auth);

router.put(async (req, res) => {
  try {
    db.connectDb();
    const { paymentMethod } = req.body;
    const user = await User.findById(req.user);
    await user.updateOne(
      {
        defaultPaymentMethod: paymentMethod,
      },
      { returnOriginal: false }
    );
    db.disconnectDb();
    return res.json({ paymentMethod: user.defaultPaymentMethod });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
