import { Sequelize } from 'sequelize';
import * as Config from '../config.json';

import User from './models/user';
import Vehicle from './models/vehicle'

import Logger from '../commons/logger';

var { ForceSync, AlterSync } = Config.Database;

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
        { name: 'Vehicle', entity: Vehicle.sequelize }
      ];

      Logger.Info('Database', 'Table verification started!');

      // User.belongsTo(Permission, { foreignKey: 'permissionId', as: 'Permission' });
      User.belongsToMany(Vehicle, { through: 'User_Vehicle', constraints: true, foreignKey: 'userId', otherKey: 'vehicleId' });
      Vehicle.belongsToMany(User, { through: 'User_Vehicle', constraints: true, foreignKey: 'vehicleId', otherKey: 'userId' });

      this.CreateDatabaseFromModels(Models)
        .then(result => {
          Logger.Info('Database', `Table verification ${result}!`);
        })
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
  private CreateDatabaseFromModels(models: { name: string, entity: Sequelize }[]) {
    return new Promise((resolve, reject) => {
      let sucess = 0;
      let errors = 0;
      let total = sucess + errors;
      let modelsWithErrors = [];
      models.forEach(async model => {
        await model.entity.sync({ force: ForceSync, alter: AlterSync })
          .then(result => {
            Logger.Info(model.name, 'verification finished!');
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
              await model.entity.sync({ force: ForceSync, alter: AlterSync })
                .then(result => {
                  Logger.Info(model.name, 'correction completed!');
                  sucess++;
                })
                .catch(error => {
                  Logger.Error(model.name, error);
                  errors++;
                });

              total = sucess + errors;
              if (total == modelsWithErrors.length && errors > 0) {
                resolve('finished with errors');
              } else {
                resolve('finished successfully and corrected errors');
              }
            })
          } else {
            resolve('finished successfully');
          }
        }
      });
    })
  }
}

export default Database;