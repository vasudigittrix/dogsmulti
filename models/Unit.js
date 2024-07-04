import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
import Brand from './Brand';
const unitSchema = new mongoose.Schema(
    
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

const Unit =
  mongoose.models.Unit || mongoose.model('Unit', unitSchema );

export default Unit;
