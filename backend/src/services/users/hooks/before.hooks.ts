import bcrypt from 'bcryptjs'
import type { HookContext } from '@feathersjs/feathers'

export const hashPasswordHook = async (context: HookContext) => {
  if (context.data.password) {
    context.data.password = await bcrypt.hash(context.data.password, 10)
  }
  return context
}