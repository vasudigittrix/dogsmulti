import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Customer from './Customer';
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    breed:{
        type: String
    },
    dateofbirth: {
        type: Date,
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    weight: {
        type: Number,
    },
    weightunit: {
        type: String
    },
    height:{
        type: Number
    },
    heightunit:{
        type: String
    },
    additionalInfo: {
        type:String,
    },
    image:{
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const Pet =
  mongoose.models.Pet || mongoose.model('Pet', petSchema);

export default Pet;