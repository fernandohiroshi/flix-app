import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSquelize from '@adminjs/sequelize'
import { sequelize } from '../database'
import { adminJsResources } from './resources'
import { Category, Course, Episode, User } from '../models'
import bcrypt from 'bcrypt'
import { locale } from './locale'

AdminJS.registerAdapter(AdminJSSquelize)

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: adminJsResources,
  locale: locale,
  branding: {
    companyName: 'Flix App',
    logo: '/logo.png',
    softwareBrothers: false,
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
  dashboard: {
    component: AdminJS.bundle('./components/Dashboard'),
    handler: async (req, res, context) => {
      const categories = await Category.count()
      const courses = await Course.count()
      const episodes = await Episode.count()
      const standardUsers = await User.count({ where: { role: 'user' } })

      res.json({
        Cursos: courses,
        Episódios: episodes,
        Categorias: categories,
        Usuários: standardUsers,
      })
    },
  },
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } })

      if (user && user.role === 'admin') {
        const matched = await bcrypt.compare(password, user.password)

        if (matched) {
          return user
        }
      }

      return false
    },
    cookiePassword: 'senha',
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
)
