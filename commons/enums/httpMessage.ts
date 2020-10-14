/**
 * @description
 * @enum {number}
 */
export enum HttpMessage {
  Saved_Successfully = 'Cadastrado(a) com sucesso!',
  Updated_Successfully = 'Atualizado(a) com sucesso!',
  Deleted_Successfully = 'Deletado(a) com sucesso!',
  Unknown_Error = 'Erro desconhecido, por favor reporte a equipe técnica!',
  Already_Exists = 'Já cadastrado(a)!',
  Found = 'Encontrado(a)!',
  Not_Found = 'Não encontrado(a)!',
  Empty = '',
  Request_Unauthorized = 'A requisição não foi autorizada!',
  Request_Forbidden = 'A requisição foi negada!',
  Login_Unauthorized = 'A conta informada é inválida!',
  Login_Authorized = 'Acesso bem sucedido!',
  Account_Created = 'Conta criada com sucesso!',
  Parameters_Not_Provided = 'Os parâmetros esperados não foram fornecidos!',
  Send_Successfully = 'Enviado(a) com sucesso!',
  Email_Account_Recovery = 'Um email foi enviado para'
}