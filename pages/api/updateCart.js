import { createRouter } from "next-connect";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "@/utils/db";
import Cart from "@/models/Cart";

const router = createRouter();

router.post(async (req, res) => {
  try {
    db.connectDb();
    const promises = req.body.products.map(async (product) => {
      let dbProduct = await Product.findById(product._id).lean();
      let originalPrice = dbProduct.subProducts[product.style].sizes.find(
        (item) => item.size == product.size
      ).price;
      let quantity = dbProduct.subProducts[product.style].sizes.find(
        (item) => item.size == product.size
      ).qty;
      let discount = dbProduct.subProducts[product.style].discount;
      return {
        ...product,
        priceBefore: originalPrice,
        price:
          Number(discount > 0
            ? (originalPrice - originalPrice / discount).toFixed(2) // TODO check if price calculation is correct
            : originalPrice),
        discount: discount,
        quantity: quantity,
        shippingFee: dbProduct.shipping,
      };
    });

    const data = await Promise.all(promises);
    db.disconnectDb();
    return res.json(data);
  } catch (error) {
    console.log("error update cart", error);
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
