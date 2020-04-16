import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import Logger from '../commons/core/logger';

// Entities
import User from './models/user';
import Vehicle from './models/vehicle'
import UserAdress from './models/userAdress';
import Card from './models/card';
import Company from './models/company';
import CompanyAdress from './models/companyAdress';
import Employee from './models/employee';
import Payment from './models/payment';
import Parking from './models/parking';
import Rule from './models/rule';
import ParkingPromotion from './models/parkingPromotion';
import ParkingSpace from './models/parkingSpace';
import ParkingAdress from './models/parkingAdress';
import Context from '../main/context';

const _instance = Context.getInstance();
const { ForceSync, AlterSync, IsLogger } = Config.Database;

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
    // The order influences creation in the database
    const Models = [
      { name: 'User', entity: User.sequelize },
      { name: 'Vehicle', entity: Vehicle.sequelize },
      { name: 'UserAdress', entity: UserAdress.sequelize },
      { name: 'Card', entity: Card.sequelize },
      { name: 'Company', entity: Company.sequelize },
      { name: 'CompanyAdress', entity: CompanyAdress.sequelize },
      { name: 'Employee', entity: Employee.sequelize },
      { name: 'Parking', entity: Parking.sequelize },
      { name: 'Rule', entity: Rule.sequelize },
      { name: 'parkingPromotion', entity: ParkingPromotion.sequelize },
      { name: 'parkingSpace', entity: ParkingSpace.sequelize },
      { name: 'parkingAdress', entity: ParkingAdress.sequelize }
    ];

    Logger.Info('Database', 'Table verification started!');

    /* #region  Table Relationships */

    // N:N
    User.belongsToMany(Vehicle, { through: 'UserVehicles' });
    Vehicle.belongsToMany(User, { through: 'UserVehicles' });

    User.belongsToMany(Card, { through: 'UserCards' });
    Card.belongsToMany(User, { through: 'UserCards' });

    // 1:N
    Company.hasMany(Employee, { foreignKey: 'companyId', as: 'Employee' });
    Company.hasMany(CompanyAdress, { foreignKey: 'companyId', as: 'CompanyAdress' });
    Company.hasMany(Parking, { foreignKey: 'companyId', as: 'Parking' });
    User.hasMany(UserAdress, { foreignKey: 'userId', as: 'UserAdress' });
    Rule.hasMany(Employee, { foreignKey: 'ruleId', as: 'Employee' });
    Parking.hasMany(ParkingPromotion, { foreignKey: 'parkingId', as: 'ParkingPromotion' });
    Parking.hasMany(ParkingAdress, { foreignKey: 'parkingId', as: 'ParkingAdress' });
    Parking.hasMany(ParkingSpace, { foreignKey: 'parkingId', as: 'ParkingSpace' });
    //Payment.belongsTo(ParkingpacSe, {foreignKey: 'parkingSpaceId', as: 'ParkingSpace'});

    // 1:1

    /* #endregion */

    _instance.authenticate()
      .then(() => {
        Logger.Info('Database', 'Connection established successfully!');
        this.CreateTables(Models)
          .then(result => {
            Logger.Info('Database', `Table verification ${result}!`);
          });
      })
      .catch(error => {
        Logger.Error('Database', 'Error when trying to connect to the database!');
        Logger.Error('Database', error);
      });
  }

  private async CreateTables(models: { name: string, entity: Sequelize }[]) {
    return new Promise(async (resolve) => {
      let count = 0;
      let sucess = 0;
      let errors = 0;
      let total = 0;
      const modelsWithErrors = [];

      if (ForceSync) {
        await this.DropAllTables(models);
      }

      while (count < models.length) {
        await models[count].entity.sync({ alter: AlterSync, logging: (IsLogger ? msg => Logger.Info(models[count].name, msg) : IsLogger) })
          .then(() => {
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
        if (total === models.length) {
          Logger.Info('Database', `verification result => Sucess: ${sucess} | Errors: ${errors} | Total: ${models.length}`);

          if (errors > 0) {
            Logger.Error('Database', `${errors} errors in the models were found!`);
            Logger.Warn('Database', 'trying to fix the models');
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
    let attempts = 0;
    let count = 0;
    let sucess = 0;
    let errors = 0;

    while (count < modelsWithErrors.length) {
      await modelsWithErrors[count].entity.sync({ alter: AlterSync, logging: IsLogger ? msg => Logger.Info(modelsWithErrors[count].name, msg) : IsLogger })
        .then(() => {
          Logger.Info(modelsWithErrors[count].name, 'correction completed!');
          sucess++;
        })
        .catch(error => {
          Logger.Error(modelsWithErrors[count].name, error);
          errors++;
        });
      count++;
      attempts = sucess + errors;
      if (attempts === modelsWithErrors.length) {
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
    const queryInterface = models[0].entity.getQueryInterface();
    await queryInterface.dropAllTables()
      .then(() => {
        Logger.Warn('Database', 'drop all the table finished!');
      }).catch(error => {
        Logger.Error('Database', error);
      });
  }
}

export default Database;