
import crypto from 'crypto';
import { findIndex } from 'lodash';
import CONFIG from '../config';
import BinanceClass from './binance';

class UtilsClass {
  constructor() {
    this.PASSWORD_SECRET = CONFIG.PASSWORD_SECRET;
    this.DATA_SECRET = CONFIG.DATA_SECRET;
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

  /**
   * @see https://lollyrock.com/posts/nodejs-encryption/
   */
  encrypt(text) {
    const cipher = crypto.createCipher('aes-256-ctr', this.DATA_SECRET)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  decrypt(text){
    const decipher = crypto.createDecipher('aes-256-ctr', this.DATA_SECRET)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}
const utils = new UtilsClass();
export default utils;
export { BinanceClass }