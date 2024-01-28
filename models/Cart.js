import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product", // reference to Product model
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        size: {
          type: String,
        },
        // style: {
        //   style: String,
        //   color: String,
        //   image: String,
        // },
        qty: {
          type: Number,
        },
        color: {
          color: String,
          image: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
      type: ObjectId,
      ref: "User", // reference to User model
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart
  ? mongoose.models.Cart
  : mongoose.model("Cart", cartSchema);
export default Cart;
