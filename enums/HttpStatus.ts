
enum HttpCod {
  Continue = 100,
  Processing = 102,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  Found = 302,
  Bad_Request = 400,
  Unauthorized = 401,
  Forbidden = 403,
  Not_Found = 404,
  Expectation_Failed = 417,
  Internal_Server_Error = 500,
  Not_Implemented = 501,
  Bad_Gateway = 502,
  Service_Unavailable = 503
}

//http://weblink.com.br/blog/o-que-e-http-codigos-erros-http
function HttpMessage(value : HttpCod, msg = null){
  var result;
    switch(value){
      case HttpCod.Continue :{
        result = "Continua";
        break;
      }
      case HttpCod.Processing :{
        result = "Processando";
        break;
      }
      case HttpCod.Ok :{
        result = {
          code: 200,
          message: msg ?? 'Ok'
        };

        break;
      }
      case HttpCod.Created :{
        result = "Criado/Gerado"
        break;
      }
      case HttpCod.Accepted :{
        result = "Aceito";
        break;
      }
      case HttpCod.Found :{
        result = "Encontrado"
        break;
      }
      case HttpCod.Bad_Request :{
        result = {
          code: 400,
          message: msg ?? 'Solicitação Inválida'
        };

        break;
      }
      case HttpCod.Unauthorized :{
        break;
      }
      case HttpCod.Forbidden :{
        break;
      }
      case HttpCod.Not_Found :{
        break;
      }
      case HttpCod.Expectation_Failed :{
        break;
      }
      case HttpCod.Internal_Server_Error :{
        result = {
          code: 500,
          message: 'Internal Server Error'
        };

        break;
      }
      case HttpCod.Not_Implemented :{
        break;
      }
      case HttpCod.Bad_Gateway :{
        break;
      }
      case HttpCod.Service_Unavailable :{
        break;
      }
      default :{
        result = "Codigo não encontrado!";
      }
    }

    return result;
}

export { HttpCod,  HttpMessage};