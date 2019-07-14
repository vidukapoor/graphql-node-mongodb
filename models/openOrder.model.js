import mongoose from 'mongoose';

var brewerySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  list: {
    type: Array,
    required: true
  },
});

export default mongoose.model('OpenOrder', brewerySchema);
