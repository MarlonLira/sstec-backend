export class InnerJson {
  static parse = (value: any) => value ? JSON.parse(JSON.stringify(value)) : value;
}