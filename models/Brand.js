import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
const brandSchema = new mongoose.Schema(
    
  {
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true
    },
    userid: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Brand =
  mongoose.models.Brand || mongoose.model('Brand',brandSchema);

export default Brand;
