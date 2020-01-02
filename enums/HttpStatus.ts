
enum Cod {
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
function HttpMessage(value : Cod){
  var result = "";
    switch(value){
      case Cod.Continue :{
        result = "Continua";
        break;
      }
      case Cod.Processing :{
        result = "Processando";
        break;
      }
      case Cod.Ok :{
        result = "Ok"
        break;
      }
      case Cod.Created :{
        result = "Criado/Gerado"
        break;
      }
      case Cod.Accepted :{
        result = "Aceito";
        break;
      }
      case Cod.Found :{
        result = "Encontrado"
        break;
      }
      case Cod.Bad_Request :{
        break;
      }
      case Cod.Unauthorized :{
        break;
      }
      case Cod.Forbidden :{
        break;
      }
      case Cod.Not_Found :{
        break;
      }
      case Cod.Expectation_Failed :{
        break;
      }
      case Cod.Internal_Server_Error :{
        break;
      }
      case Cod.Not_Implemented :{
        break;
      }
      case Cod.Bad_Gateway :{
        break;
      }
      case Cod.Service_Unavailable :{
        break;
      }
      default :{
        result = "Codigo não encontrado!";
      }
    }

    return result;
}