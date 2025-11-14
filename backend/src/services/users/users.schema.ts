import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import type { UsersService } from './users.class'
import { dataValidator, queryValidator } from '../../validators'

// Main data model
export const usersSchema = Type.Object({
  _id: ObjectIdSchema(),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  role: Type.Union([Type.Literal('user'), Type.Literal('admin')]),
  createdAt: Type.Optional(Type.String({ format: 'date-time' })),
  updatedAt: Type.Optional(Type.String({ format: 'date-time' }))
}, { $id: 'Users', additionalProperties: false })

export type Users = Static<typeof usersSchema>
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve<Users, HookContext<UsersService>>({})
export const usersExternalResolver = resolve<Users, HookContext<UsersService>>({})

// Schema for creating new entries
export const usersDataSchema = Type.Pick(usersSchema, ['name', 'email', 'password', 'role'], { $id: 'UsersData' })
export type UsersData = Static<typeof usersDataSchema>
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve<UsersData, HookContext<UsersService>>({})

// Schema for updating existing entries
export const usersPatchSchema = Type.Partial(usersSchema, { $id: 'UsersPatch' })
export type UsersPatch = Static<typeof usersPatchSchema>
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve<UsersPatch, HookContext<UsersService>>({})

// Schema for queries
export const usersQueryProperties = Type.Pick(usersSchema, ['_id', 'email', 'role'])
export const usersQuerySchema = Type.Intersect([
  querySyntax(usersQueryProperties),
  Type.Object({}, { additionalProperties: false })
], { additionalProperties: false })
export type UsersQuery = Static<typeof usersQuerySchema>
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve<UsersQuery, HookContext<UsersService>>({})
