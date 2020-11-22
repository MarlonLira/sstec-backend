import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import { Logger } from '../commons/core/logger';
import { Context } from '../main/context';

// Entities
import { User, UserDAO } from './models/user.model';
import { Vehicle, VehicleDAO } from './models/vehicle.model';
import { UserAddress, UserAddressDAO } from './models/user-address.model';
import { Card } from './models/card.model';
import { Company } from './models/company.model';
import { CompanyAddress } from './models/company-address.model';
import { Employee } from './models/employee.model';
import { Parking } from './models/parking.model';
import { Rule } from './models/rule.model';
import { ParkingSpace, ParkingSpaceDAO } from './models/parking-space.model';
import { ParkingAddress } from './models/parking-address.model';
import { Scheduling } from './models/scheduling.model';
import { ParkingScore } from './models/parking-score.model';
import { Log } from './models/log.model';
import { AccountRecovery } from './models/account-recovery.model';
import { ParkingFile } from './models/parking-file.model';
import { RouteSecurity } from './models/route-security.model';
import { FavoriteParking } from './models/favorite-parking.model';
import { SchedulingProduct, SchedulingProductDAO } from './models/scheduling-product.model';
import { ParkingProduct, ParkingProductDAO } from './models/parking-product.model';

const _instance = Context.getInstance();
const { ForceSync, AlterSync, DropAllTable, IsLogger } = Config.Database;

interface PersistenceModel {
  name: string;
  entity: Sequelize
}

export class Database {

  public Build() {
    // The order influences creation in the database!
    const models: PersistenceModel[] = [
      { name: 'User', entity: UserDAO.sequelize },
      { name: 'Vehicle', entity: VehicleDAO.sequelize },
      { name: 'UserAddress', entity: UserAddressDAO.sequelize },
      { name: 'Card', entity: Card.sequelize },
      { name: 'Company', entity: Company.sequelize },
      { name: 'CompanyAddress', entity: CompanyAddress.sequelize },
      { name: 'Employee', entity: Employee.sequelize },
      { name: 'Parking', entity: Parking.sequelize },
      { name: 'Rule', entity: Rule.sequelize },
      { name: 'ParkingSpace', entity: ParkingSpaceDAO.sequelize },
      { name: 'ParkingAddress', entity: ParkingAddress.sequelize },
      { name: 'Scheduling', entity: Scheduling.sequelize },
      { name: 'ParkingScore', entity: ParkingScore.sequelize },
      { name: 'Log', entity: Log.sequelize },
      { name: 'AccountRecovery', entity: AccountRecovery.sequelize },
      { name: 'ParkingFile', entity: ParkingFile.sequelize },
      { name: 'RouteSecurity', entity: RouteSecurity.sequelize },
      { name: 'FavoriteParking', entity: FavoriteParking.sequelize },
      { name: 'SchedulingProduct', entity: SchedulingProductDAO.sequelize },
      { name: 'ParkingProduct', entity: ParkingProductDAO.sequelize }
    ];

    Logger.Info('Database', 'Table verification started!');

    /* #region  Table Relationships */

    // N:N - belongs to many

    // 1:N - has many
    Company.hasMany(Parking, { foreignKey: 'companyId', as: 'parkings' });
    Company.hasMany(RouteSecurity, { foreignKey: 'companyId', as: 'routeSecurity' });
    User.hasMany(Vehicle, { foreignKey: 'userId', as: 'vehicles' });
    User.hasMany(Card, { foreignKey: 'userId', as: 'cards' });
    User.hasMany(ParkingScore, { foreignKey: 'userId', as: 'parkingScore' });
    User.hasMany(Scheduling, { foreignKey: 'userId', as: 'scheduling' });
    User.hasMany(AccountRecovery, { foreignKey: 'userId', as: 'accountRecovery' });
    User.hasMany(FavoriteParking, { foreignKey: 'userId', as: 'favoriteParkings' });
    Rule.hasMany(Employee, { foreignKey: 'ruleId', as: 'employees' });
    Rule.hasMany(RouteSecurity, { foreignKey: 'ruleId', as: 'routeSecurity' });
    Parking.hasMany(ParkingSpace, { foreignKey: 'parkingId', as: 'parkingSpace' });
    Parking.hasMany(ParkingScore, { foreignKey: 'parkingId', as: 'parkingScore' });
    Parking.hasMany(Employee, { foreignKey: 'parkingId', as: 'employees' });
    Parking.hasMany(ParkingFile, { foreignKey: 'parkingId', as: 'files' });
    Parking.hasMany(FavoriteParking, { foreignKey: 'parkingId', as: 'favoriteParkings' });
    Parking.hasMany(ParkingProduct, { foreignKey: 'parkingId', as: 'parkingProducts' });
    ParkingSpace.hasMany(Scheduling, { foreignKey: 'parkingSpaceId', as: 'scheduling' });
    ParkingProduct.hasMany(SchedulingProduct, { foreignKey: 'parkingProductId', as: 'schedulingProducts' });
    Employee.hasMany(AccountRecovery, { foreignKey: 'employeeId', as: 'accountsRecovery' });
    Scheduling.hasMany(SchedulingProduct, { foreignKey: 'schedulingId', as: 'schedulingProducts' });

    // N:1 - belongs to
    Employee.belongsTo(Parking, { as: 'parking' });
    Employee.belongsTo(Company, { as: 'company' });
    Employee.belongsTo(Rule, { as: 'rule' });
    ParkingProduct.belongsTo(Parking, { as: 'parking' });

    // 1:1 - has one
    Company.hasOne(CompanyAddress, { foreignKey: 'companyId', as: 'address' });
    User.hasOne(UserAddress, { foreignKey: 'userId', as: 'address' });
    Parking.hasOne(ParkingAddress, { foreignKey: 'parkingId', as: 'address' });

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
          this.CreateTables(models)
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

  private async CreateTables(models: { name: string, entity: Sequelize }[], count = 0, success = 0, errors = 0, total = 0) {
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
            this.CreateTables(models, count, success, errors, total);
          })
          .catch(error => {
            Logger.Error(models[count].name, error);
            modelsWithErrors.push(models[count]);
            errors++;
            total = success + errors;
            count++;
            this.CreateTables(models, count, success, errors, total);
          });
      } else {
        Logger.Info('Database', `verification result => Sucess: ${success} | Errors: ${errors} | Total: ${models.length}`);

        if (errors > 0) {
          Logger.Error('Database', `${errors} errors in the models were found!`);
          Logger.Warn('Database', 'trying to fix the models');
          await this.TryFixModels(modelsWithErrors, resolve);
        } else {
          resolve('finished successfully');
        }
      }
    });
  }

  private async TryFixModels(modelsWithErrors: any[], resolve: (value?: unknown) => void, count = 0, attempts = 0, sucess = 0, errors = 0) {
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
          this.TryFixModels(modelsWithErrors, resolve, count, attempts, sucess, errors);
        })
        .catch(error => {
          Logger.Error(modelsWithErrors[count].name, error);
          errors++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels(modelsWithErrors, resolve, count, attempts, sucess, errors);
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