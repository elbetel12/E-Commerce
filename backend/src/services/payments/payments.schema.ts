// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PaymentsService } from './payments.class'

// Main data model schema
export const paymentsSchema = Type.Object({
  _id: ObjectIdSchema(),
  orderId: Type.String(),
  userId: Type.String(),
  amount: Type.Number(),
  method: Type.Union([Type.Literal('card'), Type.Literal('paypal'), Type.Literal('cash')]),
  status: Type.Union([Type.Literal('pending'), Type.Literal('completed')]),
  paidAt: Type.Optional(Type.String({ format: 'date-time' }))
}, { $id: 'Payments', additionalProperties: false })

export type Payments = Static<typeof paymentsSchema>
export const paymentsValidator = getValidator(paymentsSchema, dataValidator)
export const paymentsResolver = resolve<Payments, HookContext<PaymentsService>>({})
export const paymentsExternalResolver = resolve<Payments, HookContext<PaymentsService>>({})

export const paymentsDataSchema = Type.Pick(paymentsSchema, ['orderId', 'amount', 'method', 'status'], { $id: 'PaymentsData' })
export type PaymentsData = Static<typeof paymentsDataSchema>
export const paymentsDataValidator = getValidator(paymentsDataSchema, dataValidator)
export const paymentsDataResolver = resolve<PaymentsData, HookContext<PaymentsService>>({})

export const paymentsPatchSchema = Type.Partial(paymentsSchema, { $id: 'PaymentsPatch' })
export type PaymentsPatch = Static<typeof paymentsPatchSchema>
export const paymentsPatchValidator = getValidator(paymentsPatchSchema, dataValidator)
export const paymentsPatchResolver = resolve<PaymentsPatch, HookContext<PaymentsService>>({})

export const paymentsQueryProperties = Type.Pick(paymentsSchema, ['_id', 'orderId', 'userId', 'status'])
export const paymentsQuerySchema = Type.Intersect([querySyntax(paymentsQueryProperties), Type.Object({}, { additionalProperties: false })])
export type PaymentsQuery = Static<typeof paymentsQuerySchema>
export const paymentsQueryValidator = getValidator(paymentsQuerySchema, queryValidator)
export const paymentsQueryResolver = resolve<PaymentsQuery, HookContext<PaymentsService>>({})
