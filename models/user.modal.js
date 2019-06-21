import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brewery: {
    type: String,
    ref: 'Brewery',
    required: true
  },
  alcohol: {
    type: Number,
    min: [4, 'Provide real beer please (too few degree)'],
    max: [25, 'Provide real beer please (too few degree)'],
    required: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
});


export default mongoose.model('User', userSchema);
