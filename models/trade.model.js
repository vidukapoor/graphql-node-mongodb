import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({ 
  userId: String,
  isSuccess: String,
  reason: String,
  asset: { type: String, uppercase: true }, 
  currency: { type: String, uppercase: true },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

export default mongoose.model('Trade', tradeSchema);
