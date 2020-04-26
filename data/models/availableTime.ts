import Attributes from '../../commons/core/attributes';
import { InnerDate } from '../../commons/core/innerDate';

/**
 * @description
 * @author Marlon Lira
 * @class AvailableTime
 */
class AvailableTime {

  date: InnerDate[];
  parkingSpaceId!: number;

  /**
   *Creates an instance of AvailableTime.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof AvailableTime
   */
  constructor(json?: any) {
    this.date = Attributes.ReturnIfValid(json.token);
    this.parkingSpaceId = Attributes.ReturnIfValid(json.parkingSpaceId);
  }
}

export default AvailableTime;