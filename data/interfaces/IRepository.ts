/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IRepository
 */
export default interface IRepository {
  GetById(id : number);
  ToList();
  ToDictionary();
  Save(entity: any);
  Update(entity: any);
}
