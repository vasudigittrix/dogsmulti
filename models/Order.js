import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
import User from './User';
import Product from './Product';
import Shipping from './Shipping';

const OrderSchema = new Schema({
    // customername: {
    //   type: String,
    // },
    orderId: {
      type: String,
      default: () => uuidv4(), 
      unique: true,
    },
    orderdate: {
      type: Date,
      required: true,
    },
    userid: {
      type: ObjectId,  
      ref: 'User',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    coupon: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'refund'],
    },
    paymentMethod: {
      type: String,
    },
    orderstatus: {
      type: String,
      enum: ['pending','canceled', 'completed'],
    },
    shippingid: {
      type: ObjectId,  
      ref: 'Shipping',
      },
      subAmount: {
        type: Number
      },
     
  });
  

const Order =
  mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;

  