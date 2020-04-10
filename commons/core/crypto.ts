import { CryptoType } from '../enums/cryptoType';
import * as CryptoJS from 'crypto-js'
import * as bcrypt from 'bcrypt';

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
    secret: "|*#5522&*QWE?/",
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
    return CryptoJS.AES.encrypt(card, this.cryptographyData.secret).toString();
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
  private static DecryptCard(hash: string): string {
    var bytes = CryptoJS.AES.decrypt(hash, this.cryptographyData.secret);
    return bytes.toString(CryptoJS.enc.Utf8);
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
  static Compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

export default Crypto;
