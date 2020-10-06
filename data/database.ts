import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import Logger from '../commons/core/logger';
import Context from '../main/context';

// Entities
import { User } from './models/user.model';
import Vehicle from './models/vehicle.model';
import { UserAddress } from './models/user-address.model';
import ParkingFinance from './models/parking-finance.model';
import ParkingPromotion from './models/parking-promotion.model';
import { Card } from './models/card.model';
import { Company } from './models/company.model';
import { CompanyAddress } from './models/company-address.model';
import { Employee } from './models/employee.model';
import { Parking } from './models/parking.model';
import { Rule } from './models/rule.model';
import { ParkingSpace } from './models/parking-space.model';
import { ParkingAddress } from './models/parking-address.model';
import { Scheduling } from './models/scheduling.model';
import { ParkingScore } from './models/parking-score.model';
import { Log } from './models/log.model';
import { AccountRecovery } from './models/account-recovery.model';
import { ParkingFile } from './models/parking-file.model';
import { RouteSecurity } from './models/route-security.model';

const _instance = Context.getInstance();
const { ForceSync, AlterSync, DropAllTable, IsLogger } = Config.Database;

interface PersistenceModel {
  name: string;
  entity: Sequelize
}

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
    const models: PersistenceModel[] = [
      { name: 'User', entity: User.sequelize },
      { name: 'Vehicle', entity: Vehicle.sequelize },
      { name: 'UserAddress', entity: UserAddress.sequelize },
      { name: 'Card', entity: Card.sequelize },
      { name: 'Company', entity: Company.sequelize },
      { name: 'CompanyAddress', entity: CompanyAddress.sequelize },
      { name: 'Employee', entity: Employee.sequelize },
      { name: 'Parking', entity: Parking.sequelize },
      { name: 'Rule', entity: Rule.sequelize },
      { name: 'ParkingPromotion', entity: ParkingPromotion.sequelize },
      { name: 'ParkingSpace', entity: ParkingSpace.sequelize },
      { name: 'ParkingAddress', entity: ParkingAddress.sequelize },
      { name: 'Scheduling', entity: Scheduling.sequelize },
      { name: 'ParkingScore', entity: ParkingScore.sequelize },
      { name: 'ParkingFinance', entity: ParkingFinance.sequelize },
      { name: 'Log', entity: Log.sequelize },
      { name: 'AccountRecovery', entity: AccountRecovery.sequelize },
      { name: 'ParkingFile', entity: ParkingFile.sequelize },
      { name: 'RouteSecurity', entity: RouteSecurity.sequelize }
    ];

    Logger.Info('Database', 'Table verification started!');

    /* #region  Table Relationships */

    // N:N

    // 1:N
    Company.hasMany(Parking, { foreignKey: 'companyId', as: 'Parking' });
    Company.hasMany(RouteSecurity, { foreignKey: 'companyId', as: 'RouteSecurity' });
    User.hasMany(Vehicle, { foreignKey: 'userId', as: 'Vehicle' });
    User.hasMany(Card, { foreignKey: 'userId', as: 'Card' });
    User.hasMany(ParkingScore, { foreignKey: 'userId', as: 'ParkingScore' });
    User.hasMany(Scheduling, { foreignKey: 'userId', as: 'Scheduling' });
    User.hasMany(AccountRecovery, { foreignKey: 'userId', as: 'AccountRecovery' });
    Rule.hasMany(Employee, { foreignKey: 'ruleId', as: 'Employee' });
    Rule.hasMany(RouteSecurity, { foreignKey: 'ruleId', as: 'RouteSecurity' });
    Parking.hasMany(ParkingPromotion, { foreignKey: 'parkingId', as: 'ParkingPromotion' });
    Parking.hasMany(ParkingSpace, { foreignKey: 'parkingId', as: 'ParkingSpace' });
    Parking.hasMany(ParkingScore, { foreignKey: 'parkingId', as: 'ParkingScore' });
    Parking.hasMany(ParkingFinance, { foreignKey: 'parkingId', as: 'ParkingFinance' });
    Parking.hasMany(Employee, { foreignKey: 'parkingId', as: 'Employee' });
    Parking.hasMany(ParkingFile, { foreignKey: 'parkingId', as: 'ParkingFile' });
    ParkingSpace.hasMany(Scheduling, { foreignKey: 'parkingSpaceId', as: 'Scheduling' });
    Employee.hasMany(AccountRecovery, { foreignKey: 'employeeId', as: 'AccountRecovery' });

    // 1:1
    Company.hasOne(CompanyAddress, { foreignKey: 'companyId', as: 'CompanyAddress' });
    User.hasOne(UserAddress, { foreignKey: 'userId', as: 'UserAddress' });
    Parking.hasOne(ParkingAddress, { foreignKey: 'parkingId', as: 'ParkingAddress' });

    /* #endregion */
    this.checkAndBuild(models)
      .catch((error: any) => {
        if (error.toString().indexOf('ETIMEDOUT') != -1) {
          Logger.Info('Database', 'trying to connect to the database again!');
          this.checkAndBuild(models);
        }
      });
  }

  private checkAndBuild(models: PersistenceModel[]): Promise<any> {
    return new Promise((resolve, reject) => {
      _instance.authenticate({ logging: (IsLogger ? msg => Logger.Info('Authenticate', msg) : IsLogger) })
        .then(() => {
          Logger.Info('Database', 'Connection established successfully!');
          this.CreateTables2(models)
            .then(result => {
              Logger.Info('Database', `Table verification ${result}!`);
              resolve(true);
            });
        })
        .catch(error => {
          Logger.Error('Database', 'Error when trying to connect to the database!');
          Logger.Error('Database', error);
          reject(error);
        });
    });
  }

  private async CreateTables2(models: { name: string, entity: Sequelize }[], count = 0, success = 0, errors = 0, total = 0) {
    return new Promise(async (resolve) => {
      const modelsWithErrors = [];

      if (DropAllTable) {
        await this.DropAllTables(models);
      }

      if (total < models.length) {
        models[count].entity.sync(
          {
            force: ForceSync,
            alter: AlterSync,
            logging: (IsLogger ? msg => Logger.Info(models[count].name, msg) : IsLogger)
          })
          .then(() => {
            Logger.Info(models[count].name, 'verification finished!');
            success++;
            total = success + errors;
            count++;
            this.CreateTables2(models, count, success, errors, total);
          })
          .catch(error => {
            Logger.Error(models[count].name, error);
            modelsWithErrors.push(models[count]);
            errors++;
            total = success + errors;
            count++;
            this.CreateTables2(models, count, success, errors, total);
          });
      } else {
        Logger.Info('Database', `verification result => Sucess: ${success} | Errors: ${errors} | Total: ${models.length}`);

        if (errors > 0) {
          Logger.Error('Database', `${errors} errors in the models were found!`);
          Logger.Warn('Database', 'trying to fix the models');
          await this.TryFixModels2(modelsWithErrors, resolve);
        } else {
          resolve('finished successfully');
        }
      }
    });
  }

  private async CreateTables(models: { name: string, entity: Sequelize }[]) {
    return new Promise(async (resolve) => {
      let count = 0;
      let sucess = 0;
      let errors = 0;
      let total = 0;
      const modelsWithErrors = [];

      if (DropAllTable) {
        await this.DropAllTables(models);
      }

      while (count < models.length) {
        await models[count].entity.sync(
          {
            force: ForceSync,
            alter: AlterSync,
            logging: (IsLogger ? msg => Logger.Info(models[count].name, msg) : IsLogger)

          })
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

  private async TryFixModels2(modelsWithErrors: any[], resolve: (value?: unknown) => void, count = 0, attempts = 0, sucess = 0, errors = 0) {
    if (attempts < modelsWithErrors.length) {
      modelsWithErrors[count].entity.sync(
        {
          alter: AlterSync,
          logging: IsLogger ? msg => Logger.Info(modelsWithErrors[count].name, msg) : IsLogger
        })
        .then(() => {
          Logger.Info(modelsWithErrors[count].name, 'correction completed!');
          sucess++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels2(modelsWithErrors, resolve, count, attempts, sucess, errors);
        })
        .catch(error => {
          Logger.Error(modelsWithErrors[count].name, error);
          errors++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels2(modelsWithErrors, resolve, count, attempts, sucess, errors);
        });
    } else {
      Logger.Info('Database', `correction attempts => Sucess: ${sucess} | Errors: ${errors} | Total: ${attempts}`);
      if (errors > 0) {
        resolve('finished with errors');
      }
      else {
        resolve('finished successfully and corrected errors');
      }
    }
  }

  private async TryFixModels(modelsWithErrors: any[], resolve: (value?: unknown) => void) {
    let attempts = 0;
    let count = 0;
    let sucess = 0;
    let errors = 0;

    while (count < modelsWithErrors.length) {
      await modelsWithErrors[count].entity.sync(
        {
          alter: AlterSync,
          logging: IsLogger ? msg => Logger.Info(modelsWithErrors[count].name, msg) : IsLogger
        })
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