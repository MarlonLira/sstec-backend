export default interface IAuthSecurity {
  TokenValidate(response? : any);
  TokenGeneration(response? : any);
  SignIn(response? : any);
  SignUp(response? : any);
}