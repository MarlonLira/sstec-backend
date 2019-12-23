class dbConfig {
  host: string;
  port: number;
  userName: string;
  password: string;
  schema: string;

  constructor() {
    this.host = "localhost";
    this.port = 3306;
    this.userName = "root";
    this.password = "123456";
    this.schema = "sstec";
  }
}

export { dbConfig };