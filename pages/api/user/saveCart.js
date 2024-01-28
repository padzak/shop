import { createRouter } from "next-connect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import nextConnect from "next-connect";
import db from "../../../utils/db";
import Cart from "@/models/Cart";

const router = createRouter();

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { cart, user_id } = req.body;
    let products = [];
    let user = await User.findById(user_id);
    let existingCart = await Cart.findOne({ user: user_id });
    if (existingCart) {
      await existingCart.remove();
    }

    for (let i = 0; i < cart.length; i++) {
      let dbProduct = await Product.findById(cart[i]._id).lean();
      let subProduct = dbProduct.subProducts[cart[i].style]; // check with [id].js contents
      let tempProduct = {};
      tempProduct.name = dbProduct.name;
      tempProduct.product = dbProduct._id;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      tempProduct.image = subProduct.images[0];
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.size = cart[i].size;
      let price = Number(
        subProduct.sizes.find((product) => product.size == cart[i].size).price
      );
      tempProduct.price =
        subProduct.discount > 0
          ? (price - (price * subProduct.discount) / 100).toFixed(2)
          : price.toFixed(2); // TODO check if price calculation is correct
      products.push(tempProduct);
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].qty;
    }
    cartTotal = cartTotal.toFixed(2);

    await new Cart({
      products,
      cartTotal,
      user: user_id,
    }).save();

    db.disconnectDb();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
