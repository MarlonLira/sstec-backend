import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ICardService } from "../interfaces/IServices/cardService.interface";
import { Card } from "../models/card.model";
import ICardRepository from "../interfaces/IRepositories/cardRepository.interface";
import Attributes from "../../commons/core/attributes";
import { CryptoType } from "../../commons/enums/cryptoType";
import Crypto from '../../commons/core/crypto';

@injectable()
export class CardService implements ICardService {

  constructor(
    @inject(TYPES.ICardRepository) private repository: ICardRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  save(card: Card): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const cards = await this.repository.getByUserId(card.userId);

        if (!Attributes.IsValid(cards)) {
          card.number = Crypto.Encrypt(card.number, CryptoType.CARD);
          card.expirationDate = Crypto.Encrypt(card.expirationDate, CryptoType.CARD);
          card.secureCode = Crypto.Encrypt(card.secureCode, CryptoType.CARD);

          this.repository.save(card)
            .then(result => resolve(result));

        } else {
          const findCard = cards.find(c => Crypto.Decrypt(c.number, CryptoType.CARD) === card.number);
          if (!Attributes.IsValid(findCard)) {
            card.number = Crypto.Encrypt(card.number, CryptoType.CARD);
            card.expirationDate = Crypto.Encrypt(card.expirationDate, CryptoType.CARD);
            card.secureCode = Crypto.Encrypt(card.secureCode, CryptoType.CARD);

            this.repository.save(card)
              .then(result => resolve(result));

          } else {
            reject(await this.log.critical('Cartão', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));
          }
        }
      } catch (error) {
        reject(await this.log.critical('Cartão', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
      }
    });
  }

  update(card: Card): Promise<any> {
    return new Promise((resolve, reject) => {
      card.number = Crypto.Encrypt(card.number, CryptoType.CARD);
      card.expirationDate = Crypto.Encrypt(card.expirationDate, CryptoType.CARD);
      card.secureCode = Crypto.Encrypt(card.secureCode, CryptoType.CARD);

      this.repository.update(card)
        .then(result => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Cartão', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Cartão', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<Card> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: Card) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Cartão', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByUserId(userId: number): Promise<Card[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByUserId(userId)
        .then(async (result: Card[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Cartão', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
