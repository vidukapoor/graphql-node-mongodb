import mongoose from 'mongoose';

var openOderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  list: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('OpenOrder', openOderSchema);
