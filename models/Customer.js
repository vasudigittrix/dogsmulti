import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
const customerSchema = new mongoose.Schema(
    
  {
    image: {
      type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    pets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet'
    }],
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Customer =
  mongoose.models.Customer || mongoose.model('Customer',customerSchema);

export default Customer;
