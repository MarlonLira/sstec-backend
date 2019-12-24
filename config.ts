class dbConfig {
  host: string;
  port: number;
  userName: string;
  password: string;
  schema: string;

  constructor() {
    this.host = "DESKTOP-O8EQSGP";
    this.port = 1433;
    this.userName = "sa";
    this.password = "Root1526";
    this.schema = "sstec";
  }
}
 
export { dbConfig };