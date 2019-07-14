import _ from 'lodash';
import { graphql } from 'graphql';
import UserModel from '../../models/user.modal';
import utils from './index';
import { mutation } from '../../graphql/mutations/openorder/add';
import GraphQlModel from '../../graphql/index';

class BinanceWrapper {
  async getBinanceUsers() {
    const users = await UserModel.find({ isActive: true }).exec();
    users.forEach((item) => {
      const binanceData = _.find(item.userKeys, { exchange: 'KEY1' }) || {};
      if (Object.keys(binanceData).length) {
        const key = utils.decrypt(binanceData.key);
        const secret = utils.decrypt(binanceData.secret);
        this.putOpenOrders(key, secret, item._id);
      }
    })
  }

  getBinanceInstance(key, secret) {
    const binance = require('node-binance-api')().options({
      APIKEY: key,
      APISECRET: secret,
      useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
      test: true,
      verbose: true,
    });
    return binance
  }

  putOpenOrders(key, secret, userId) {
    this.getBinanceInstance(key, secret).openOrders(false, async (error, openOrders) => {
      try {
        if (!error) {
          const data = { userId, list: openOrders }
          const response = await graphql(GraphQlModel, mutation, '', '', { data })
          console.log('putOpenOrders......', response)
        } else {
          throw (error.body)
        }
      } catch (e) {
        console.log('putOpenOrders......', e);
      }
    });
  }
}

const BinanceClass = new BinanceWrapper();
export default BinanceClass;