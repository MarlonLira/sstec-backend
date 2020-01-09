enum HttpCode {
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

export { HttpCode };