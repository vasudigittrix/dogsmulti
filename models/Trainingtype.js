import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
const trainingtypeSchema = new mongoose.Schema(
    
  {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

const Trainingtype =
  mongoose.models.Trainingtype || mongoose.model('Trainingtype', trainingtypeSchema);

export default Trainingtype;