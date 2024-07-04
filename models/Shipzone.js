import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
import Brand from './Brand';
import { Steering } from 'mdi-material-ui';
const shipzoneSchema = new mongoose.Schema(
    
  {
    name: {
        type: String,
        required: true
    },
    logisticid: {
        type: ObjectId,
        required: true
    },
    deliverycharge: {
        type: Number,
        required: true
    },
    deliverytime: {
        type: String,
    },
    cities: {
        type: String
    },
    country: {
        type: String
    },
    state: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Shipzone =
  mongoose.models.Shipzone || mongoose.model('Shipzone', shipzoneSchema );

export default Shipzone;