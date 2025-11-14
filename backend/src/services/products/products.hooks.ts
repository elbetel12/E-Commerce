import { authenticate } from '@feathersjs/authentication'
import type { HookContext } from '../../declarations'

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      async (context: HookContext) => {
        if (context.params.user?.role !== 'admin') {
          throw new Error('Only admins can create products')
        }
        return context
      }
    ],
    patch: [
      authenticate('jwt'),
      async (context: HookContext) => {
        if (context.params.user?.role !== 'admin') {
          throw new Error('Only admins can update products')
        }
        return context
      }
    ],
    remove: [
      authenticate('jwt'),
      async (context: HookContext) => {
        if (context.params.user?.role !== 'admin') {
          throw new Error('Only admins can delete products')
        }
        return context
      }
    ]
  },
  after: {},
  error: {}
}