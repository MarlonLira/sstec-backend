import { Sequelize, Transaction } from 'sequelize';
import * as Config from '../config.json';

import User from './models/user';
import Vehicle from './models/vehicle'
import UserAdress from './models/userAdress';
import Card from './models/card';

import Logger from '../commons/logger';
import Company from './models/company';

var { ForceSync, AlterSync, IsLogger } = Config.Database;

/**
 * @description
 * @author Marlon Lira
 * @class Database
 */
class Database {

  /**
   * @description
   * @author Marlon Lira
   * @memberof Database
   */
  public Build() {
    if (ForceSync || AlterSync) {
      //Order influences creation in the database
      let Models = [
        { name: 'User', entity: User.sequelize },
        { name: 'Vehicle', entity: Vehicle.sequelize },
        { name: 'UserAdress', entity: UserAdress.sequelize },
        { name: 'Card', entity: Card.sequelize },
        { name: 'Company', entity: Company.sequelize }

      ];

      Logger.Info('Database', 'Table verification started!');

      // Table relationchip
      User.belongsToMany(Vehicle, { through: 'User_Vehicle', constraints: true, foreignKey: 'userId', otherKey: 'vehicleId' });
      Vehicle.belongsToMany(User, { through: 'User_Vehicle', constraints: true, foreignKey: 'vehicleId', otherKey: 'userId' });

      User.belongsToMany(Card, { through: 'User_Card', constraints: true, foreignKey: 'userId', otherKey: 'cardId' });
      Card.belongsToMany(User, { through: 'User_Card', constraints: true, foreignKey: 'cardId', otherKey: 'userId' });

      UserAdress.belongsTo(User, { foreignKey: 'userId', as: 'User' });
      // Table relationchip END
      
      if (!ForceSync) {
        this.CreateDatabase(Models)
          .then(result => {
            Logger.Info('Database', `Table verification ${result}!`);
          });
      } else {
        this.ForceCreateDatabase(Models)
          .then(result => {
            Logger.Info('Database', `Table verification ${result}!`);
          });
      }
    }
  }

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @param {{ name: string, entity: Sequelize }[]} models
   * @returns 
   * @memberof Database
   */
  private ForceCreateDatabase(models: { name: string, entity: Sequelize }[]) {
    return new Promise((resolve, reject) => {
      let sucess = 0;
      let errors = 0;
      let total = sucess + errors;
      let modelsWithErrors = [];
      models.forEach(async model => {
        await model.entity.sync({ force: ForceSync, alter: AlterSync, logging: (IsLogger ? msg => Logger.Info(model.name, msg) : IsLogger) })
          .then(result => {
            Logger.Info(model.name, 'verification finished!')
            sucess++;
          })
          .catch(error => {
            Logger.Error(model.name, error);
            modelsWithErrors.push(model);
            errors++;
          });

        total = sucess + errors;
        if (total == models.length) {
          Logger.Info('Database', `Sucess: ${sucess} | Errors: ${errors} | Total: ${total}`);

          if (errors > 0) {
            Logger.Error('Database', `${errors} errors in the models were found!`);
            Logger.Warn('Database', 'trying to fix the models');
            total = 0;
            sucess = 0;
            errors = 0;

            modelsWithErrors.forEach(async model => {
              await model.entity.sync({ force: ForceSync, alter: AlterSync, logging: IsLogger ? msg => Logger.Info(model.name, msg) : IsLogger })
                .then(result => {
                  Logger.Info(model.name, 'correction completed!')
                  sucess++;
                })
                .catch(error => {
                  Logger.Error(model.name, error);
                  errors++;
                });

              total = sucess + errors;
              if (total == modelsWithErrors.length) {
                Logger.Info('Database', `Sucess: ${sucess} | Errors: ${errors} | Total: ${total}`);
                if (errors > 0) {
                  resolve('finished with errors');
                } else {
                  resolve('finished successfully and corrected errors');
                }
              }
            })
          } else {
            resolve('finished successfully');
          }
        }
      });
    })
  }

  private async CreateDatabase(models: { name: string, entity: Sequelize }[]) {
    return new Promise(async (resolve, reject) => {
      let count = 0;
      let sucess = 0;
      let errors = 0;
      let total = 0;
      let modelsWithErrors = [];
      while (count < models.length) {
        await models[count].entity.sync({ force: ForceSync, alter: AlterSync, logging: (IsLogger ? msg => Logger.Info(models[count].name, msg) : IsLogger) })
          .then(result => {
            sucess++;
          })
          .catch(error => {
            Logger.Error(models[count].name, error);
            modelsWithErrors.push(models[count]);
            errors++;
          }).finally(() => Logger.Info(models[count].name, 'verification finished!'));
        count++;
        total = sucess + errors;
        if (total == models.length) {
          Logger.Info('Database', `Sucess: ${sucess} | Errors: ${errors} | Total: ${total}`);

          if (errors > 0) {
            Logger.Error('Database', `${errors} errors in the models were found!`);
            Logger.Warn('Database', 'trying to fix the models');
            sucess = 0;
            errors = 0;
            count = 0;

            while (count < modelsWithErrors.length) {
              await modelsWithErrors[count].entity.sync({ force: ForceSync, alter: AlterSync, logging: IsLogger ? msg => Logger.Info(modelsWithErrors[count].name, msg) : IsLogger })
                .then(result => {
                  Logger.Info(modelsWithErrors[count].name, 'correction completed!');
                  sucess++;
                })
                .catch(error => {
                  Logger.Error(modelsWithErrors[count].name, error);
                  errors++;
                });
              count++;
              total = sucess + errors;
              if (total == modelsWithErrors.length) {
                Logger.Info('Database', `Sucess: ${sucess} | Errors: ${errors} | Total: ${total}`);
                if (errors > 0) {
                  resolve('finished with errors');
                } else {
                  resolve('finished successfully and corrected errors');
                }
              }
            }
          } else {
            resolve('finished successfully');
          }
        }
      }
    });
  }
}

export default Database;