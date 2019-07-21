import mongoose from 'mongoose';

const keysSchema = new mongoose.Schema({ exchange: String, key: String, secret: String }, { _id : false });
// enum of exchange will be here also, already added graphql

const portfolioSchema = new mongoose.Schema({ 
  asset: { type: String, uppercase: true }, 
  currency: { type: String, uppercase: true },
  isActive: Boolean
}, { _id : false });


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  userKeys: {
    type: [keysSchema],
  },
  portfolio: {
    type: [portfolioSchema],
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  loginToken: {
    type: Array,
  },
  userType: {
    type: String,
    enum: ['user', 'super_admin'],
    required: true,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('User', userSchema);
