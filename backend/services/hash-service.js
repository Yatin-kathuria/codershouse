const Crypto = require("crypto");

class HashService {
  hashOtp(data) {
    return Crypto.createHmac("sha256", process.env.HASH_SECRET)
      .update(data)
      .digest("hex");
  }
}

module.exports = new HashService();
