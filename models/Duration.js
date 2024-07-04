import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
const durationSchema = new mongoose.Schema(
    
  {
    duration: {
        type: String,
        required: true
    },
    price: {
      type: String,
      required: true
  },
    status: {
        type: Boolean,
        required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Duration =
  mongoose.models.Duration || mongoose.model('Duration', durationSchema);

export default Duration;
