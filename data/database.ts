import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import Logger from '../commons/core/logger';
import Context from '../main/context';

// Entities
import User from './models/user.model';
import Vehicle from './models/vehicle.model';
import UserAdress from './models/userAdress.model';
import Card from './models/card.model';
import Company from './models/company.model';
import CompanyAdress from './models/companyAdress.model';
import Employee from './models/employee.model';
import Parking from './models/parking.model';
import { Rule } from './models/rule.model';
import ParkingPromotion from './models/parkingPromotion.model';
import ParkingSpace from './models/parkingSpace.model';
import ParkingAdress from './models/parkingAdress.model';
import Scheduling from './models/scheduling.model';
import ParkingScore from './models/parkingScore.model';
import ParkingFinance from './models/parkingFinance.model';
import { Log } from './models/logger.model';

const _instance = Context.getInstance();
const { ForceSync, AlterSync, DropAllTable, IsLogger } = Config.Database;

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
      { name: 'ParkingPromotion', entity: ParkingPromotion.sequelize },
      { name: 'ParkingSpace', entity: ParkingSpace.sequelize },
      { name: 'ParkingAdress', entity: ParkingAdress.sequelize },
      { name: 'Scheduling', entity: Scheduling.sequelize },
      { name: 'ParkingScore', entity: ParkingScore.sequelize },
      { name: 'ParkingFinance', entity: ParkingFinance.sequelize },
      { name: 'Log', entity: Log.sequelize }
    ];

    Logger.Info('Database', 'Table verification started!');

    /* #region  Table Relationships */

    // N:N

    // 1:N
    Company.hasMany(CompanyAdress, { foreignKey: 'companyId', as: 'CompanyAdress' });
    Company.hasMany(Parking, { foreignKey: 'companyId', as: 'Parking' });
    User.hasMany(UserAdress, { foreignKey: 'userId', as: 'UserAdress' });
    User.hasMany(Vehicle, { foreignKey: 'userId', as: 'Vehicle' });
    User.hasMany(Card, { foreignKey: 'userId', as: 'Card' });
    User.hasMany(ParkingScore, { foreignKey: 'userId', as: 'ParkingScore' }); // Revisar isso, acredito que seja 1:1
    User.hasMany(Scheduling, { foreignKey: 'userId', as: 'Scheduling' });
    Rule.hasMany(Employee, { foreignKey: 'ruleId', as: 'Employee' });
    Parking.hasMany(ParkingPromotion, { foreignKey: 'parkingId', as: 'ParkingPromotion' });
    Parking.hasMany(ParkingAdress, { foreignKey: 'parkingId', as: 'ParkingAdress' });
    Parking.hasMany(ParkingSpace, { foreignKey: 'parkingId', as: 'ParkingSpace' });
    Parking.hasMany(ParkingScore, { foreignKey: 'parkingId', as: 'ParkingScore' });
    Parking.hasMany(ParkingFinance, { foreignKey: 'parkingId', as: 'ParkingFinance' });
    Parking.hasMany(Employee, { foreignKey: 'parkingId', as: 'Employee' });
    ParkingSpace.hasMany(Scheduling, { foreignKey: 'parkingSpaceId', as: 'Scheduling' });

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
      let sucess = 0;
      let errors = 0;
      let total = 0;
      const modelsWithErrors = [];

      if (DropAllTable) {
        await this.DropAllTables(models);
      }

      models.forEach(async model => {
        await model.entity.sync({
          force: ForceSync,
          alter: AlterSync,
          logging: (IsLogger ? msg => Logger.Info(model.name, msg) : IsLogger)
        })
          .then(() => {
            Logger.Info(model.name, 'verification finished!')
            sucess++;
          })
          .catch(error => {
            Logger.Error(model.name, error);
            modelsWithErrors.push(model);
            errors++;
          });

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
        }
      });
    });
  }

  private async TryFixModels(modelsWithErrors: any[], resolve: (value?: unknown) => void) {
    let attempts = 0;
    let sucess = 0;
    let errors = 0;

    modelsWithErrors.forEach(async modelsWithError => {
      await modelsWithError.entity.sync({
        alter: AlterSync,
        logging: IsLogger ? msg => Logger.Info(modelsWithError.name, msg) : IsLogger
      })
        .then(() => {
          Logger.Info(modelsWithError.name, 'correction completed!');
          sucess++;
        })
        .catch(error => {
          Logger.Error(modelsWithError.name, error);
          errors++;
        });
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
    });
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