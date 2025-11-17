import type { HookContext } from '../../../declarations';
import { hooks as authHooks } from '@feathersjs/authentication-local';

export const hashPasswordHook = authHooks.hashPassword('password');

export const setDefaultRole = (context: HookContext) => {
  if (context.data && !context.data.role) {
    context.data.role = 'user';
  }
  return context;
};
