import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({ 
  asset: Number,  // this is  number only
  currency: Number, // this is  number only
}, { _id : false });

const tradeSchema = new mongoose.Schema({ 
  id: String, 
  adviceId: String,
  action: String,
  cost: Number,
  amount: Number,
  price: String,
  balance: Number,
  date: Date,
  effectivePrice: String,
  feePercent: Number,
  portfolio: portfolioSchema,
}, { _id : false });

const signalSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: true,
    unique: true
  },
  currency: {
    type: String,
    required: true
  },
  exchange: {
    type: String,
    required: true
  },
  strategy: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  stakeAmount: {
    type: String,
    required: true
  },
  trades: {
    type: [tradeSchema],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

export default mongoose.model('Signal', signalSchema);
