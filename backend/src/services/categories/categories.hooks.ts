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
        if (context.params.user?.role !== 'admin') throw new Error('Only admins can create categories')
        return context
      }
    ],
    patch: [
      authenticate('jwt'),
      async (context: HookContext) => {
        if (context.params.user?.role !== 'admin') throw new Error('Only admins can update categories')
        return context
      }
    ],
    remove: [
      authenticate('jwt'),
      async (context: HookContext) => {
        if (context.params.user?.role !== 'admin') throw new Error('Only admins can delete categories')
        return context
      }
    ]
  },
  after: {},
  error: {}
}
