import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
const userSchema = new mongoose.Schema(
    
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
    role: {
        type: String,
        enum: ['admin', 'user', 'employee'],
        default: 'user'
    },
    commission: {
        type: String,
    },
    type: {
        type: String,
        enum: [
            'veterinarian',
            'trainer',
            'groomer',
            'walker',
            'boarder',
            'daycaretaker',
            'petsitter'
        ]        
    },
    pets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet'
    }],
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
        type: Boolean,
    },
    blocked: {
        type: Boolean,
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

const User =
  mongoose.models.User || mongoose.model('User',userSchema);

export default User;
