import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
        type: Boolean,
        required: true
    },
    description: {
        type:String,
    },
  },
  {
    timestamps: true,
  }
);

const Facility =
  mongoose.models.Facility || mongoose.model('Facility', facilitySchema);

export default Facility;
