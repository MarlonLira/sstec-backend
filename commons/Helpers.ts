class Helpers{

}

class Attributes {

  static IsValid(value : any){
    let result = false;
    if (value != undefined && value != '' && value != null) {
      result = true;
    }
    return result;
  }

  static ReturnIfValid(value : any){
    let result = null;
    if (value != undefined && value != '' && value != null) {
      result = value;
    }
    return result;
  }
  
}

export { Helpers, Attributes }