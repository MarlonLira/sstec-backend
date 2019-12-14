const Sequelize = require('sequelize');
const client = require('./models/client2.js')

const sequelize = new Sequelize('sstec', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });