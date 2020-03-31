import { Attributes } from "../commons/Helpers";

class Dashboard {
  credit!: number;
  debit!: number;
  goal!: number;

  constructor(json: any) {
    this.credit = Attributes.ReturnIfValid(json.credit, 0);
    this.debit = Attributes.ReturnIfValid(json.debit, 0);
    this.goal = Attributes.ReturnIfValid(json.goal, 0);
  }
}

export default Dashboard;