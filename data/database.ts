import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import { Context } from '../main/context';

// Entities
import { UserDAO } from './models/user.model';
import { VehicleDAO } from './models/vehicle.model';
import { UserAddressDAO } from './models/user-address.model';
import { CardDAO } from './models/card.model';
import { CompanyDAO } from './models/company.model';
import { CompanyAddressDAO } from './models/company-address.model';
import { EmployeeDAO } from './models/employee.model';
import { ParkingDAO } from './models/parking.model';
import { RuleDAO } from './models/rule.model';
import { ParkingSpaceDAO } from './models/parking-space.model';
import { ParkingAddressDAO } from './models/parking-address.model';
import { SchedulingDAO } from './models/scheduling.model';
import { ParkingScoreDAO } from './models/parking-score.model';
import { LogDAO } from './models/log.model';
import { AccountRecoveryDAO } from './models/account-recovery.model';
import { ParkingFileDAO } from './models/parking-file.model';
import { RouteSecurityDAO } from './models/route-security.model';
import { FavoriteParkingDAO } from './models/favorite-parking.model';
import { SchedulingProductDAO } from './models/scheduling-product.model';
import { ParkingProductDAO } from './models/parking-product.model';
import { ParkingPriceDAO } from './models/parking-price.model';
import { LogService } from './services/log.service';
import { LogRepository } from './repositories/log.repository';
import { HttpCode } from '../commons/enums/httpCode';

const _instance = Context.getInstance();
const { ForceSync, AlterSync, DropAllTable, IsLogger } = Config.Database;

interface PersistenceModel {
  name: string;
  entity: Sequelize
}

export class Database {

  private readonly _log: LogService;

  constructor() {
    this._log = new LogService(new LogRepository());
  }

  public Build() {
    // The order influences creation in the database!
    const models: PersistenceModel[] = [
      { name: 'User', entity: UserDAO.sequelize },
      { name: 'Vehicle', entity: VehicleDAO.sequelize },
      { name: 'UserAddress', entity: UserAddressDAO.sequelize },
      { name: 'Card', entity: CardDAO.sequelize },
      { name: 'Company', entity: CompanyDAO.sequelize },
      { name: 'CompanyAddress', entity: CompanyAddressDAO.sequelize },
      { name: 'Employee', entity: EmployeeDAO.sequelize },
      { name: 'Parking', entity: ParkingDAO.sequelize },
      { name: 'Rule', entity: RuleDAO.sequelize },
      { name: 'ParkingSpace', entity: ParkingSpaceDAO.sequelize },
      { name: 'ParkingAddress', entity: ParkingAddressDAO.sequelize },
      { name: 'Scheduling', entity: SchedulingDAO.sequelize },
      { name: 'ParkingScore', entity: ParkingScoreDAO.sequelize },
      { name: 'Log', entity: LogDAO.sequelize },
      { name: 'AccountRecovery', entity: AccountRecoveryDAO.sequelize },
      { name: 'ParkingFile', entity: ParkingFileDAO.sequelize },
      { name: 'RouteSecurity', entity: RouteSecurityDAO.sequelize },
      { name: 'FavoriteParking', entity: FavoriteParkingDAO.sequelize },
      { name: 'SchedulingProduct', entity: SchedulingProductDAO.sequelize },
      { name: 'ParkingProduct', entity: ParkingProductDAO.sequelize },
      { name: 'ParkingPrice', entity: ParkingPriceDAO.sequelize }
    ];

    this._log.info('Database', HttpCode.Not_Applicable, 'Table verification started!', undefined);

    /* #region  Table Relationships */

    // N:N - belongs to many

    // 1:N - has many
    CompanyDAO.hasMany(ParkingDAO, { foreignKey: 'companyId', as: 'parkings' });
    CompanyDAO.hasMany(RouteSecurityDAO, { foreignKey: 'companyId', as: 'routeSecurity' });
    UserDAO.hasMany(VehicleDAO, { foreignKey: 'userId', as: 'vehicles' });
    UserDAO.hasMany(CardDAO, { foreignKey: 'userId', as: 'cards' });
    UserDAO.hasMany(ParkingScoreDAO, { foreignKey: 'userId', as: 'parkingScore' });
    UserDAO.hasMany(SchedulingDAO, { foreignKey: 'userId', as: 'scheduling' });
    UserDAO.hasMany(AccountRecoveryDAO, { foreignKey: 'userId', as: 'accountRecovery' });
    UserDAO.hasMany(FavoriteParkingDAO, { foreignKey: 'userId', as: 'favoriteParkings' });
    RuleDAO.hasMany(EmployeeDAO, { foreignKey: 'ruleId', as: 'employees' });
    RuleDAO.hasMany(RouteSecurityDAO, { foreignKey: 'ruleId', as: 'routeSecurity' });
    ParkingDAO.hasMany(ParkingSpaceDAO, { foreignKey: 'parkingId', as: 'parkingSpace' });
    ParkingDAO.hasMany(ParkingScoreDAO, { foreignKey: 'parkingId', as: 'parkingScore' });
    ParkingDAO.hasMany(EmployeeDAO, { foreignKey: 'parkingId', as: 'employees' });
    ParkingDAO.hasMany(ParkingFileDAO, { foreignKey: 'parkingId', as: 'files' });
    ParkingDAO.hasMany(FavoriteParkingDAO, { foreignKey: 'parkingId', as: 'favoriteParkings' });
    ParkingDAO.hasMany(ParkingProductDAO, { foreignKey: 'parkingId', as: 'parkingProducts' });
    ParkingDAO.hasMany(ParkingPriceDAO, { foreignKey: 'parkingId', as: 'parkingPrices' });
    ParkingSpaceDAO.hasMany(SchedulingDAO, { foreignKey: 'parkingSpaceId', as: 'scheduling' });
    ParkingProductDAO.hasMany(SchedulingProductDAO, { foreignKey: 'parkingProductId', as: 'schedulingProducts' });
    EmployeeDAO.hasMany(AccountRecoveryDAO, { foreignKey: 'employeeId', as: 'accountsRecovery' });
    SchedulingDAO.hasMany(SchedulingProductDAO, { foreignKey: 'schedulingId', as: 'schedulingProducts' });

    // N:1 - belongs to
    EmployeeDAO.belongsTo(ParkingDAO, { as: 'parking' });
    EmployeeDAO.belongsTo(CompanyDAO, { as: 'company' });
    EmployeeDAO.belongsTo(RuleDAO, { as: 'rule' });
    ParkingProductDAO.belongsTo(ParkingDAO, { as: 'parking' });

    // 1:1 - has one
    CompanyDAO.hasOne(CompanyAddressDAO, { foreignKey: 'companyId', as: 'address' });
    UserDAO.hasOne(UserAddressDAO, { foreignKey: 'userId', as: 'address' });
    ParkingDAO.hasOne(ParkingAddressDAO, { foreignKey: 'parkingId', as: 'address' });

    /* #endregion */
    this.checkAndBuild(models)
      .catch((error: any) => {
        if (error.toString().indexOf('ETIMEDOUT') != -1) {
          this._log.warn('Database', HttpCode.Not_Applicable, 'trying to connect to the database again!', error);
          this.checkAndBuild(models);
        }
      });
  }

  private checkAndBuild(models: PersistenceModel[]): Promise<any> {
    return new Promise((resolve, reject) => {
      _instance.authenticate({ logging: (IsLogger ? msg => this._log.info('Authenticate', HttpCode.Not_Applicable, msg, undefined) : IsLogger) })
        .then(() => {
          this._log.info('Database', HttpCode.Not_Applicable, 'Connection established successfully!', undefined);
          this.CreateTables(models)
            .then(result => {
              this._log.info('Database', HttpCode.Not_Applicable, `Table verification ${result}!`, undefined);
              resolve(true);
            });
        })
        .catch(error => {
          this._log.error('Database', HttpCode.Not_Applicable, 'Error when trying to connect to the database!', undefined);
          this._log.error('Database', HttpCode.Not_Applicable, '', error);
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
            logging: (IsLogger ? msg => this._log.info(models[count].name, HttpCode.Not_Applicable, msg, undefined) : IsLogger)
          })
          .then(() => {
            this._log.info(models[count].name, HttpCode.Not_Applicable, 'verification finished!', undefined);
            success++;
            total = success + errors;
            count++;
            this.CreateTables(models, count, success, errors, total);
          })
          .catch(error => {
            this._log.error(models[count].name, HttpCode.Not_Applicable, '', error);
            modelsWithErrors.push(models[count]);
            errors++;
            total = success + errors;
            count++;
            this.CreateTables(models, count, success, errors, total);
          });
      } else {
        this._log.info('Database', HttpCode.Not_Applicable, `verification result => Sucess: ${success} | Errors: ${errors} | Total: ${models.length}`, undefined);

        if (errors > 0) {
          this._log.error('Database', HttpCode.Not_Applicable, `${errors} errors in the models were found!`, undefined);
          this._log.warn('Database', HttpCode.Not_Applicable, 'trying to fix the models', undefined);
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
          logging: IsLogger ? msg => this._log.info(modelsWithErrors[count].name, HttpCode.Not_Applicable, msg, undefined) : IsLogger
        })
        .then(() => {
          this._log.info(modelsWithErrors[count].name, HttpCode.Not_Applicable, 'correction completed!', undefined);
          sucess++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels(modelsWithErrors, resolve, count, attempts, sucess, errors);
        })
        .catch(error => {
          this._log.error(modelsWithErrors[count].name, HttpCode.Not_Applicable, '', error);
          errors++;
          attempts = sucess + errors;
          count++;
          this.TryFixModels(modelsWithErrors, resolve, count, attempts, sucess, errors);
        });
    } else {
      this._log.info('Database', HttpCode.Not_Applicable, `correction attempts => Sucess: ${sucess} | Errors: ${errors} | Total: ${attempts}`, undefined);
      if (errors > 0) {
        resolve('finished with errors');
      }
      else {
        resolve('finished successfully and corrected the errors');
      }
    }
  }

  private async DropAllTables(models: { name: string; entity: Sequelize; }[]) {
    const queryInterface = models[0].entity.getQueryInterface();
    await queryInterface.dropAllTables()
      .then(() => {
        this._log.warn('Database', HttpCode.Not_Applicable, 'drop all the table finished!', undefined);
      }).catch(error => {
        this._log.error('Database', HttpCode.Not_Applicable, '', error);
      });
  }
}