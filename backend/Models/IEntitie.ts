import { ClientMdl } from './Client';


export default interface IEntitie {
    Save(value: ClientMdl);
    Search(value: ClientMdl);
    Update(value: ClientMdl);
    Delete(value: ClientMdl);
}