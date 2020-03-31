import { User } from './User';
class Auth {

  token!: string;
  validated!: boolean;
  user!: User;

  constructor(json?: any) {
    this.token = json.token;
    this.user = json.user;
  }
}

export { Auth };
