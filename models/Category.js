import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
const categorySchema = new mongoose.Schema(
    
  {
    name: {
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

const Category =
  mongoose.models.Category || mongoose.model('Category',categorySchema);

export default Category;
