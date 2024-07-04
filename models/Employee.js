import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
const employeeSchema = new mongoose.Schema(
    
  {
    image: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    commission: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    aboutself: {
        type: String
    },
    expert: {
        type: String
    },
    facebooklink: {
        type: String
    },
    instagramlink: {
        type: String
    },
    twitterlink: {
        type: String
    },
    dribblelink: {
        type: String
    },
    address: {
        type: String,
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    verificationStatus: {
        type: String
    },
    blocked: {
        type: Boolean,
        default: 'false'
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

const Employee =
  mongoose.models.Employee || mongoose.model('Employee',employeeSchema);

export default Employee;
