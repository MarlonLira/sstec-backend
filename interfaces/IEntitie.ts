export default interface IEntitie {
  Save(response? : any);
  Search(response?: any, isAll?: boolean);
  Update(response? : any);
  Delete(response? : any);
}