export class Json {
  static parse = (value: any) => value ? JSON.parse(JSON.stringify(value)) : value;
}