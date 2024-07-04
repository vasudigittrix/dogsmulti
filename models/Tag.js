import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
import Brand from './Brand';
const tagSchema = new mongoose.Schema(
    
  {
    name: {
        type: String,
        required: true
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

const Tag =
  mongoose.models.Tag || mongoose.model('Tag', tagSchema );

export default Tag;