import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Product from './Product';
import User from './User';
import Variation from './Variation';
import Order from './Order';
const cartSchema = new mongoose.Schema(
  {
    userid: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    productid: {
      type: ObjectId,
      ref: "Product",
    },
    variationid: {
      type: ObjectId,
      ref: "Variation",
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderid: {
      type: ObjectId,
      ref: 'Order',
      default: null, 
    },
  },
  {
    timestamps: true,
  }
);

const Cart =
  mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;