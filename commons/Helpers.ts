class Helpers{

}

class Attributes {

  static IsValid(value : any){
    return (value != undefined && value != '' && value != null) ? true : false;
  }

  static ReturnIfValid(value : any, returnIfNotValid : any = undefined){
    return (value != undefined && value != '' && value != null) ? value : returnIfNotValid;
  }
}

class InnerJson{
  static IsValid(json : any, requiredAttributes : string []){
    let result = false;
    let count = 0;
    if (json != undefined && json != '' && json != null) {
      result = true;
    }
    requiredAttributes.forEach(element => {
      if(json.hasOwnProperty(element)){
        result = true;
        count ++;
      }
    });
    if(count <= 0) result = false;

    return result;
  }
}

export { Helpers, Attributes, InnerJson }