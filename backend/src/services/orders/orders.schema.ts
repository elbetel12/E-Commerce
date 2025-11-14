// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { OrdersService } from './orders.class'

// Main data model schema
export const ordersSchema = Type.Object({
  _id: ObjectIdSchema(),
  userId: Type.String(),
  products: Type.Array(Type.Object({
    productId: Type.String(),
    quantity: Type.Number(),
    price: Type.Number()
  })),
  totalPrice: Type.Number(),
  status: Type.Union([
    Type.Literal('pending'),
    Type.Literal('paid'),
    Type.Literal('shipped'),
    Type.Literal('delivered')
  ]),
  createdAt: Type.Optional(Type.String({ format: 'date-time' })),
  updatedAt: Type.Optional(Type.String({ format: 'date-time' }))
}, { $id: 'Orders', additionalProperties: false })

export type Orders = Static<typeof ordersSchema>
export const ordersValidator = getValidator(ordersSchema, dataValidator)
export const ordersResolver = resolve<Orders, HookContext<OrdersService>>({})
export const ordersExternalResolver = resolve<Orders, HookContext<OrdersService>>({})

export const ordersDataSchema = Type.Pick(ordersSchema, ['products', 'totalPrice', 'status'], { $id: 'OrdersData' })
export type OrdersData = Static<typeof ordersDataSchema>
export const ordersDataValidator = getValidator(ordersDataSchema, dataValidator)
export const ordersDataResolver = resolve<OrdersData, HookContext<OrdersService>>({})

export const ordersPatchSchema = Type.Partial(ordersSchema, { $id: 'OrdersPatch' })
export type OrdersPatch = Static<typeof ordersPatchSchema>
export const ordersPatchValidator = getValidator(ordersPatchSchema, dataValidator)
export const ordersPatchResolver = resolve<OrdersPatch, HookContext<OrdersService>>({})

export const ordersQueryProperties = Type.Pick(ordersSchema, ['_id', 'userId', 'status'])
export const ordersQuerySchema = Type.Intersect([querySyntax(ordersQueryProperties), Type.Object({}, { additionalProperties: false })])
export type OrdersQuery = Static<typeof ordersQuerySchema>
export const ordersQueryValidator = getValidator(ordersQuerySchema, queryValidator)
export const ordersQueryResolver = resolve<OrdersQuery, HookContext<OrdersService>>({})
