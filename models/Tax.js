import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
import Brand from './Brand';
const taxSchema = new mongoose.Schema(
    
  {
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['fixed', 'percentage']
    },
    moduletype: {
        type: String,
        required: true,
        enum: ['product', 'service']
    },
    status: {
        type: Boolean,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Tax =
  mongoose.models.Tax || mongoose.model('Tax', taxSchema );

export default Tax;