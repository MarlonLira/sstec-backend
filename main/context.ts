import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import Attributes from "../commons/core/attributes";

const _logging = Config.Database.Logging;
<<<<<<< HEAD
const _dbConfig = Config.Database.MySql;
=======
const _dbConfig = Config.Database.PostgreSQL;
>>>>>>> 4a7fd1688ab09d4f31d3f371d0cfc0dc6fc15a99

/**
 * @description
 * @author Marlon Lira
 * @class Context
 */
class Context {

  private static _instance: Sequelize;

  /**
   * @description Creates the database instance.
   * @author Marlon Lira
   * @static
   * @returns {Sequelize}
   * @memberof Context
   */
  private static CreateInstance(): Sequelize {
    const sequelize = new Sequelize(_dbConfig.schema, _dbConfig.username, _dbConfig.password,
      {
        port: _dbConfig.port,
        host: _dbConfig.host,
<<<<<<< HEAD
        dialect: 'mysql',
        logging: _logging,
        omitNull: true,
        timezone: '-03:00',
        // dialectOptions: {
        //   options: {
        //     trustServerCertificate: true
        //   },
        //   ssl: {
        //     rejectUnauthorized: false,
        //   }
        // }
       }
=======
        dialect: 'postgres',
        logging: _logging,
        omitNull: true,
        timezone: '-03:00',
        dialectOptions: {
          options: {
            trustServerCertificate: true
          },
          ssl: {
            rejectUnauthorized: false,
          }
        }
      }
>>>>>>> 4a7fd1688ab09d4f31d3f371d0cfc0dc6fc15a99
    );
    return sequelize;
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @returns {Sequelize}
   * @memberof Context
   */
  public static getInstance(): Sequelize {
    this._instance = Attributes.ReturnIfValid(this._instance, this.CreateInstance());
    return this._instance;
  }
}

export default Context;
