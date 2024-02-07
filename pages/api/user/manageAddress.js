import { createRouter } from "next-connect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import nextConnect from "next-connect";
import db from "../../../utils/db";
import auth from "@/middleware/auth";

const router = createRouter();
router.use(auth);

router.put(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    let user = await User.findById(req.user);
    let user_addresses = user.addresses;
    console.log("user", user);
    console.log("user_addresses", user_addresses);
    let addresses = [];
    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {
        temp_address = { ...user_addresses[i].toObject(), active: true };
        addresses.push(temp_address);
      } else {
        temp_address = { ...user_addresses[i].toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    await user.updateOne(
      {
        addresses: addresses,
      },
      { new: true }
    );
    db.disconnectDb();
    return res.json({ addresses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    let user = await User.findById(req.user);
    await user.updateOne(
      {
        $pull: { addresses: { _id: id } },
      },
      { new: true }
    );
    db.disconnectDb();
    res.json({
      message: "Address deleted successfully",
      addresses: user.addresses.filter((a) => a._id != id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
