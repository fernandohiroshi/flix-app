import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSquelize from '@adminjs/sequelize'
import { sequelize } from '../database'
import { adminJsResources } from './resources'
import { locale } from './locale'
import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authenticationOptions } from './authentication'

AdminJS.registerAdapter(AdminJSSquelize)

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: adminJsResources,
  locale: locale,
  branding: brandingOptions,
  dashboard: dashboardOptions,
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
)
