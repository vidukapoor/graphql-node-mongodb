import crypto from 'crypto';
import { findIndex } from 'lodash';
import CONFIG from '../config';
import resolvers from '../resolvers';

class UtilsClass {
  constructor() {
    this.PASSWORD_SECRET = CONFIG.PASSWORD_SECRET;
    this.DATA_SECRET = CONFIG.DATA_SECRET;
    this.FETCH_TRADE_SIGNAL = CONFIG.FETCH_TRADE_SIGNAL;
  }
  generateHash(query) {
    return crypto.createHmac("sha256", this.PASSWORD_SECRET)
      .update(query)
      .digest("hex");
  }
  mergeExchanges(oldArray, newArray) {
    let merged = oldArray;
    newArray.forEach(element => {
      const indexAvailable = findIndex(oldArray, { exchange: element.exchange });
      element.key = this.encrypt(element.key);
      element.secret = this.encrypt(element.secret);
      if (indexAvailable !== -1) {
        merged[indexAvailable] = element;
      } else {
        merged.push(element);
      }
    });
    return merged;
  }

  mergePortfolio(oldArray, newArray) {
    let merged = oldArray;
    newArray.forEach(element => {
      const indexAvailable = findIndex(oldArray, { asset: element.asset.toUpperCase(), currency: element.currency.toUpperCase() });
      if (indexAvailable !== -1) {
        merged[indexAvailable] = element;
      } else {
        merged.push(element);
      }
    });
    return merged;
  }

  /**
   * @see https://lollyrock.com/posts/nodejs-encryption/
   */
  encrypt(text) {
    const cipher = crypto.createCipher('aes-256-ctr', this.DATA_SECRET)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  decrypt(text) {
    const decipher = crypto.createDecipher('aes-256-ctr', this.DATA_SECRET)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }

  async getTradeSignals(data) {
    const filterData = utils.filterTradeSignal(data, 'api');
    if (Object.keys(filterData).length) {
      const response = await resolvers.addSignals(filterData)
      return response;
    }
  }

  filterTradeSignal(tradeData, reference) {
    if (tradeData.logType === 'papertrader') {
      const { config: {
        watch: { currency, asset, exchange },
        tradingAdvisor: { method: strategy },
        paperTrader: { simulationBalance: { stakeBalance: stakeAmount } }
      }, events: { tradeCompleted: trades = [] }
      } = tradeData;
      return {
      currency,
        asset,
        exchange,
        strategy,
        reference,
        stakeAmount,
        trades
      }
    }
    return {};
  }
}
const utils = new UtilsClass();
export default utils;