module.exports = {
  HOST:'localhost',
  USER: 'postgres',
  PASSWORD: 'selenita2020',
  DB: 'db_jwtbootcamp',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

}

























/*import { Sequelize } from "sequelize";

const sequelize = new Sequelize('db_jwtbootcamp', 'postgres', 'selenita2020', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        min: 0,
        acquire: 30000,
        idle: 10000
      },

      passwordSecret: {
        type: DataTypes.STRING, 
        allowNull: false,
        min: 8
      },
  });

  export default sequelize;*/