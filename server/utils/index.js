
import crypto from 'crypto';
import { findIndex } from 'lodash';
import CONFIG from '../config';

class UtilsClass {
  getSecret() {
    return CONFIG.PASSWORD_SECRET;
  }
  generateHash(query) {
    return crypto.createHmac("sha256", this.getSecret())
      .update(query)
      .digest("hex");
  }
  mergeExchanges(oldArray, newArray) {
    let merged = oldArray;
    newArray.forEach(element => {
      const indexAvailable = findIndex(oldArray, { exchange: element.exchange });
      console.log(indexAvailable)
      if (indexAvailable !== -1) {
        merged[indexAvailable] = element;
      } else {
        merged.push(element);
      }
    });
    return merged;
  }
}
const utils = new UtilsClass();
export default utils;