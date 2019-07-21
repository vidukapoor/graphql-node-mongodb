import mongoose from 'mongoose';

const round_config_schema = new mongoose.Schema({ 
  waiting_time: {
    type: Date,
    required: true
  }, 
  time_in_force: {
    type: String,
    enum: ['GTC', 'FOK', 'IOC'],
    required: true
  },
}, { _id : false });

const tradeConfigSchema = new mongoose.Schema({
  user_ids: {
    type: Array, // if this is null means its been applicable to all the users in the system
    required: true,
    unique: true
  },
  round_config: {
    type: [round_config_schema],
    required: true
  },
  exposure_time: {
    type: Number, // this will be in seconds
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  asset: {
    type: String,
    required: true,
    uppercase: true,
  },
  currency: {
    type: String,
    required: true,
    uppercase: true,
  },
  fallback_config_id: { // need to use this if end_time is already over and that config is already in active mode
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TradeConfig', tradeConfigSchema);
