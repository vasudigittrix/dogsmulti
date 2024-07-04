import { trimEnd } from 'lodash';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import VarValue from './VarValue';
const vartypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: [{
        type: ObjectId,
        ref: 'VarValue'
    }],
    status: {
        type: Boolean,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const VarType =
  mongoose.models.VarType || mongoose.model('VarType', vartypeSchema);

export default VarType;
