import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'flixapp_development',
  username: 'flixapp',
  password: 'flixapp',
  define: {
    underscored: true,
  },
})
