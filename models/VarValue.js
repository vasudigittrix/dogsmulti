import { trimEnd } from 'lodash';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const varvalueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
        type: String,
        required: true
    },
    typeid: {
        type: ObjectId,
    }
  },
  {
    timestamps: true,
  }
);

const VarValue =
  mongoose.models.VarValue || mongoose.model('VarValue', varvalueSchema);

export default VarValue;