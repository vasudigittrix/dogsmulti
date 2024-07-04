import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
import Employee from './Employee';
import Customer from './Customer';
import Duration from './Duration';
import Trainingtype from './Trainingtype';
import Category from './Category';
const bookingSchema = new mongoose.Schema(
  {
    bookingid: {
        type: String,
        required: true
    },
    customerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    petid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },

    type: {
        type: String,
        required: true    
    },
    date:{
        type:String
    },
    time: {
        type:String
    },
    serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    trainingtypeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainingtype'
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type:String,
    },
    status:{
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    dropoffdate: {
        type: String,
    },
    dropofftime: {
        type: String,
    },
    pickupdate: {
        type: String,
    },
    pickuptime:{
        type: String,
    },
    facilityid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    }],
    durationid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Duration'
    }],
    DropoffAddress:{
        type: String
    },
    employeeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    favoriteFood: {
        type:String,
    },
    favoriteActivity: {
        type: String,
    },
    address: {
        type: String
    },
    additionalInfo: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
