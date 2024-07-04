import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
import Brand from './Brand';
const logisticSchema = new mongoose.Schema(
    
  {
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    image: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const Logistic =
  mongoose.models.Logistic || mongoose.model('Logistic', logisticSchema );

export default Logistic;