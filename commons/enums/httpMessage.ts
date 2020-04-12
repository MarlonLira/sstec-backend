/**
 * @description
 * @enum {number}
 */
enum HttpMessage {
  Saved_Successfully = 'Cadastrado(a) com sucesso!',
  Updated_Successfully = 'Atualizado(a) com sucesso!',
  Deleted_Successfully = 'Deletado(a) com sucesso!',
  Unknown_Error = 'Erro desconhecido, por favor reporte a equipe técnica!',
  Already_Exists = 'Já cadastrado(a)!',
  Found = '',
  Empty = '',
  Login_Unauthorized = 'A conta informada é inválida!',
  Login_Authorized = 'Acesso bem sucedido!',
  Account_Created = 'Acesso bem sucedido!'
}

export { HttpMessage };