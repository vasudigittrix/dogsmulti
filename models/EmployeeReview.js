import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import User from './User';
const employeereviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    employee: {
      type: ObjectId,
      ref: 'User', 
      required: true,
    },
   
    message: {
        type: String
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    }, 
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeReview =
  mongoose.models.EmployeeReview || mongoose.model('EmployeeReview', employeereviewSchema);

export default EmployeeReview;