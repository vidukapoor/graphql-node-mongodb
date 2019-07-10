
import crypto from 'crypto';
import { findIndex } from 'lodash';
class UtilsClass {
  getSecret() {
    return "super-secret";
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