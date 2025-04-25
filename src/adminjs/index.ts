import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSquelize from '@adminjs/sequelize'
import { sequelize } from '../database'

AdminJS.registerAdapter(AdminJSSquelize)

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  branding: {
    companyName: 'Flix App',
    logo: '/logo.png',
    theme: {
      colors: {
        primary100: '#532b88', // base
        primary80: '#7555A0', // lighten 20%
        primary60: '#9880B8', // lighten 40%
        primary40: '#BAAACF', // lighten 60%
        primary20: '#DDD5E7', // lighten 80%

        grey100: '#151515',
        grey80: '#333333',
        grey60: '#4d4d4d',
        grey40: '#666666',
        grey20: '#dddddd',

        filterBg: '#333333',
        accent: '#151515',
        hoverBg: '#151515',
      },
    },
  },
})

export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)
