import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

import IEntitie from "../interfaces/IEntitie";
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { Attributes } from '../commons/Helpers';
import { InnerDate } from '../models/InnerDate';
import Dashboard from '../models/Dashboard';
import { BillingCycle } from '../models/BillingCycle';



class DashboardController extends Dashboard implements IEntitie {
  Save(response?: any) {
    throw new Error("Method not implemented.");
  }

  Search(response?: any, isAll?: boolean) {
    let query: any = {};
    let date = new InnerDate().Now();

    query.attributes = [
      [Sequelize.fn('SUM', Sequelize.col('credit')), 'credit'],
      [Sequelize.fn('SUM', Sequelize.col('debit')), 'debit']
    ];
    query.where = {
      date: {
        [Op.like]: `${date.Year}-${date.Month}%`
      }
    }

    return new Promise((resolve, reject) => {
      BillingCycle.findAll(query)
        .then(result => {
          this.credit = Attributes.ReturnIfValid(result[0].credit, 0);
          this.debit = Attributes.ReturnIfValid(result[0].debit, 0);
          this.goal = Attributes.ReturnIfValid(500, 0);
          resolve(response.status(HttpCode.Ok).send(this));
        })
        .catch(error => {
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Dashboard, error)))
        })
    })
  }

  Update(response?: any) {
    throw new Error("Method not implemented.");
  }

  Delete(response?: any) {
    throw new Error("Method not implemented.");
  }
}

export default DashboardController;