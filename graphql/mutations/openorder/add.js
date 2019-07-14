import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';

import OpenOrderModal from '../../../models/openOrder.model';
import orderInputType from '../../types/openorder/order-input';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(orderInputType)
    }
  },
  async resolve (root, params, options) {
    const { data: { userId, list } } = params;
    const response = await OpenOrderModal.findOneAndUpdate({ userId }, { $set: { userId: userId, list: list } }, { upsert: true, new : true });
    if (!response) {
      throw new Error('Error adding new order');
    }
    return true;
  }
};

const mutation = `mutation M($data: OrderInput!){
  addOrder(data: $data)
}`;

export { mutation };