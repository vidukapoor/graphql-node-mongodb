
import crypto from 'crypto';

class UtilsClass {
  getSecret() {
    return "super-secret";
  }
  generateHash(query) {
    return crypto.createHmac("sha256", this.getSecret())
      .update(query)
      .digest("hex");
  }
}
const utils = new UtilsClass();
export default utils;