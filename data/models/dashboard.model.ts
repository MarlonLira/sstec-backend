import Attributes from '../../commons/core/attributes';

/**
 * @description
 * @author Marlon Lira
 * @class Dashboard
 */
class Dashboard {
  credit!: number;
  debit!: number;
  goal!: number;

  /**
   * Creates an instance of Dashboard.
   * @author Marlon Lira
   * @param {*} json
   * @memberof Dashboard
   */
  constructor(json: any) {
    this.credit = Attributes.ReturnIfValid(json.credit, 0);
    this.debit = Attributes.ReturnIfValid(json.debit, 0);
    this.goal = Attributes.ReturnIfValid(json.goal, 0);
  }
}

export default Dashboard;