import mongoose from 'mongoose';

const keysSchema = new mongoose.Schema({ exchange: String, key: String, secret: String });
// enum of exchange will be here also, already added graphql

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  userKeys: {
    type: [keysSchema],
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('User', userSchema);
