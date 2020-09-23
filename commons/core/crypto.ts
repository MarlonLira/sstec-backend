import { CryptoType } from '../enums/cryptoType';
import * as CryptoJS from 'crypto-js'
import * as bcrypt from 'bcryptjs';

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
        return this.EncryptDefault(value);
      }
      default: {
        return this.EncryptDefault(value);
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
  private static EncryptDefault = (card: string) => CryptoJS.AES.encrypt(card, Crypto.cryptographyData.secret).toString();

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @static
   * @param {string} value
   * @returns
   * @memberof Crypto
   */
  private static DecryptCard = (hash: string): string => CryptoJS.AES.decrypt(hash, Crypto.cryptographyData.secret).toString(CryptoJS.enc.Utf8);

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @static
   * @param {string} password
   * @returns
   * @memberof Crypto
   */
  private static EncryptPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {string} password
   * @param {string} hash
   * @returns
   * @memberof Crypto
   */
  static Compare = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash);

  static GenerateRandomPassword = (): string => CryptoJS.randomBytes(5).toString('hex');

  static randomPassword(): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}

export default Crypto;
