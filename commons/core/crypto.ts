import { CryptoType } from '../enums/cryptoType';
import * as CryptoJS from 'crypto-js'
import * as bcrypt from 'bcryptjs';

export class Crypto {

  static readonly cryptographyData = {
    algorithm: "aes256",
    coding: "utf8",
    secret: "|*#5522&*QWE?/",
    type: "hex"
  };

  static encrypt(value: string, cryptoType: CryptoType): string {
    switch (cryptoType) {
      case CryptoType.PASSWORD:
        return this.encryptPassword(value);
      case CryptoType.CARD: {
        return this.encryptDefault(value);
      }
      default: {
        return this.encryptDefault(value);
      }
    }
  }

  static decrypt(value: string, cryptoType: CryptoType): string {
    switch (cryptoType) {
      case CryptoType.PASSWORD:
        throw new Error("Method not implemented.");
      case CryptoType.CARD: {
        return this.decryptCard(value);
      }
      default: {
        break;
      }
    }
  }

  private static encryptDefault = (card: string) => CryptoJS.AES.encrypt(card, Crypto.cryptographyData.secret).toString();

  private static decryptCard = (hash: string): string => CryptoJS.AES.decrypt(hash, Crypto.cryptographyData.secret).toString(CryptoJS.enc.Utf8);

  private static encryptPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  static compare = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash);

  static generateRandomPassword = (): string => CryptoJS.randomBytes(5).toString('hex');

  static randomPassword(): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
