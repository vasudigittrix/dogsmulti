import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
import Employee from './Employee';
import Category from './Category';
import User from './User';
const serviceSchema = new mongoose.Schema(
    
  {
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    defaultPrice: {
        type: String,
        required: true
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    status: {
        type: Boolean,
        required: true
    },
    type:{
      type: String,
      required: true
    },
    employeeid: [{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

     createdBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'employee'],
      required: true
    }
  }
  },
  {
    timestamps: true,
  }
);

const Service =
  mongoose.models.Service || mongoose.model('Service', serviceSchema );

export default Service;
