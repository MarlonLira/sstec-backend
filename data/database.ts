import { Sequelize, Transaction, QueryInterface } from 'sequelize';
import * as Config from '../config.json';
import Logger from '../commons/logger';

//Entities
import User from './models/user';
import Vehicle from './models/vehicle'
import UserAdress from './models/userAdress';
import Card from './models/card';
import Company from './models/company';
import CompanyAdress from './models/companyAdress';
import Employee from './models/employee';

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
        { name: 'Company', entity: Company.sequelize },
        { name: 'CompanyAdress', entity: CompanyAdress.sequelize },
        { name: 'Employee', entity: Employee.sequelize }
      ];

      Logger.Info('Database', 'Table verification started!');

      //Table relationchip
      User.belongsToMany(Vehicle, { through: 'User_Vehicle', constraints: true, foreignKey: 'userId', otherKey: 'vehicleId' });
      Vehicle.belongsToMany(User, { through: 'User_Vehicle', constraints: true, foreignKey: 'vehicleId', otherKey: 'userId' });

      User.belongsToMany(Card, { through: 'User_Card', constraints: true, foreignKey: 'userId', otherKey: 'cardId' });
      Card.belongsToMany(User, { through: 'User_Card', constraints: true, foreignKey: 'cardId', otherKey: 'userId' });

      Employee.belongsTo(Company, { foreignKey: 'companyId', as: 'Company' })
      UserAdress.belongsTo(User, { foreignKey: 'userId', as: 'User' });
      CompanyAdress.belongsTo(Company, { foreignKey: 'companyId', as: 'Company' });
      //Table relationchip End

      this.CreateDatabase(Models)
        .then(result => {
          Logger.Info('Database', `Table verification ${result}!`);
        });
    }
  }

  private async CreateDatabase(models: { name: string, entity: Sequelize }[]) {
    return new Promise(async (resolve, reject) => {
      let count = 0;
      let sucess = 0;
      let errors = 0;
      let total = 0;
      let modelsWithErrors = [];

      if (ForceSync) {
        await this.DropAllTables(models);
      }

      while (count < models.length) {
        await models[count].entity.sync({ alter: AlterSync, logging: (IsLogger ? msg => Logger.Info(models[count].name, msg) : IsLogger) })
          .then(result => {
            Logger.Info(models[count].name, 'verification finished!')
            sucess++;
          })
          .catch(error => {
            Logger.Error(models[count].name, error);
            modelsWithErrors.push(models[count]);
            errors++;
          });
        count++;
        total = sucess + errors;
        if (total == models.length) {
          Logger.Info('Database', `verification result => Sucess: ${sucess} | Errors: ${errors} | Total: ${models.length}`);

          if (errors > 0) {
            Logger.Error('Database', `${errors} errors in the models were found!`);
            Logger.Warn('Database', 'trying to fix the models');
            sucess = 0;
            errors = 0;
            count = 0;

            await this.TryFixModels(modelsWithErrors, resolve);
          } else {
            resolve('finished successfully');
          }
          break;
        }
      }
    });
  }

  private async TryFixModels(modelsWithErrors: any[], resolve: (value?: unknown) => void) {
    let attempts = 0
    let count = 0;
    let sucess = 0;
    let errors = 0;

    while (count < modelsWithErrors.length) {
      await modelsWithErrors[count].entity.sync({ alter: AlterSync, logging: IsLogger ? msg => Logger.Info(modelsWithErrors[count].name, msg) : IsLogger })
        .then(result => {
          Logger.Info(modelsWithErrors[count].name, 'correction completed!');
          sucess++;
        })
        .catch(error => {
          Logger.Error(modelsWithErrors[count].name, error);
          errors++;
        });
      count++;
      attempts = sucess + errors;
      if (attempts == modelsWithErrors.length) {
        Logger.Info('Database', `correction attempts => Sucess: ${sucess} | Errors: ${errors} | Total: ${attempts}`);
        if (errors > 0) {
          resolve('finished with errors');
        }
        else {
          resolve('finished successfully and corrected errors');
        }
      }
    }
  }

  private async DropAllTables(models: { name: string; entity: Sequelize; }[]) {
    let queryInterface = models[0].entity.getQueryInterface();
    await queryInterface.dropAllTables()
      .then(result => {
        Logger.Warn('Database', 'drop all the table finished!');
      }).catch(error => {
        Logger.Error('Database', error);
      });
  }
}

export default Database;