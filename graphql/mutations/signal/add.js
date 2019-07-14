import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';

import SignalModal from '../../../models/signal.model';
import signalInputType from '../../types/signal/signal-input';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(signalInputType)
    }
  },
  async resolve (root, params, options) {
    const signalModel = new SignalModal(params.data);
    const value = {};
    const _signalModel = Object.assign(value, signalModel._doc);
    delete _signalModel['_id']    
    const { data: { asset, exchange, currency, strategy, stakeAmount } } = params;
    const response = await SignalModal.findOneAndUpdate({ asset, exchange, currency, strategy, stakeAmount }, { $set: _signalModel }, { upsert: true, new: true });
    if (!response) {
      throw new Error('Error adding new signal');
    }
    return true;
  }
};

const mutation = `mutation M($data: SignalInput!){
  addSignal(data: $data)
}`;

export { mutation };