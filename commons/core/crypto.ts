import { CryptoType } from '../enums/cryptoType';
var bcrypt = require('bcrypt');
const crypto = require("crypto");

/**
 * @description
 * @author Marlon Lira
 * @class Crypto
 */
class Crypto {

  /**
   * @description
   * @static
   * @memberof Crypto
   */
  static readonly cryptographyData = {
    algorithm: "aes256",
    coding: "utf8",
    secret: "chaves",
    type: "hex"
  };

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {string} value
   * @param {CryptoType} cryptoType
   * @memberof Crypto
   */
  static Encrypt(value: string, cryptoType: CryptoType): string {
    switch (cryptoType) {
      case CryptoType.PASSWORD:
        return this.EncryptPassword(value);
      case CryptoType.CARD: {
        return this.EncryptCard(value);
      }
      default: {
        break;
      }
    }
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {string} value
   * @param {CryptoType} cryptoType
   * @memberof Crypto
   */
  static Decrypt(value: string, cryptoType: CryptoType): string {
    switch (cryptoType) {
      case CryptoType.PASSWORD:
        throw new Error("Method not implemented.");
      case CryptoType.CARD: {
        return this.DecryptCard(value);
      }
      default: {
        break;
      }
    }
  }

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @static
   * @param {string} card
   * @returns 
   * @memberof Crypto
   */
  private static EncryptCard(card: string) {
    const cipher = crypto.createCipher(this.cryptographyData.algorithm, this.cryptographyData.secret);
    cipher.update(card);
    return cipher.final(this.cryptographyData.type);
  }

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @static
   * @param {string} value
   * @returns 
   * @memberof Crypto
   */
  private static DecryptCard(value: string) {
    const decipher = crypto.createDecipher(this.cryptographyData.algorithm, this.cryptographyData.secret);
    decipher.update(value, this.cryptographyData.type);
    return decipher.final();
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {string} value
   * @memberof Crypto
   */
  private static DecryptPassword(value: string) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @static
   * @param {string} password
   * @returns 
   * @memberof Crypto
   */
  private static EncryptPassword(password: string) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {string} password
   * @param {string} hash
   * @returns 
   * @memberof Crypto
   */
  static Compare(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}

export default Crypto;
