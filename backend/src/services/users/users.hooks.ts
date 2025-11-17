import { hooks as authHooks } from '@feathersjs/authentication-local'
import { authenticate } from '@feathersjs/authentication'
import type { HookContext } from '../../declarations'
import { hashPasswordHook, setDefaultRole } from './hooks/before.hooks'


export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [setDefaultRole, hashPasswordHook],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt'), hashPasswordHook],
    remove: [authenticate('jwt')]
  },
  after: {
    all: [authHooks.protect('password')] 
  },
  error: {
    all: []
  }
}
