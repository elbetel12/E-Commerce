// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ReviewService } from './review.class'

// Main data model schema

export const reviewSchema = Type.Object(
  {
  _id: ObjectIdSchema(),
  userId: Type.String(),
  productId: Type.String(),
  rating: Type.Number({ minimum: 1, maximum: 5 }),
  comment: Type.Optional(Type.String()),
  createdAt: Type.Optional(Type.String({ format: 'date-time' }))
}, { $id: 'Reviews', additionalProperties: false }) 

export type Review = Static<typeof reviewSchema>
export const reviewValidator = getValidator(reviewSchema, dataValidator)
export const reviewResolver = resolve<ReviewQuery, HookContext<ReviewService>>({})

export const reviewExternalResolver = resolve<Review, HookContext<ReviewService>>({})

// Schema for creating new entries
export const reviewsDataSchema = Type.Pick(reviewSchema, ['productId', 'rating', 'comment'], { $id: 'ReviewsData' })

export type ReviewData = Static<typeof reviewsDataSchema>
export const reviewDataValidator = getValidator(reviewsDataSchema, dataValidator)
export const reviewDataResolver = resolve<ReviewData, HookContext<ReviewService>>({})

// Schema for updating existing entries
export const reviewPatchSchema = Type.Partial(reviewSchema, {
  $id: 'ReviewPatch'
})
export type ReviewPatch = Static<typeof reviewPatchSchema>
export const reviewPatchValidator = getValidator(reviewPatchSchema, dataValidator)
export const reviewPatchResolver = resolve<ReviewPatch, HookContext<ReviewService>>({})

// Schema for allowed query properties
export const reviewQueryProperties = Type.Pick(reviewSchema, ['_id','userId', 'productId'])
export const reviewQuerySchema = Type.Intersect(
  [
    querySyntax(reviewQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ReviewQuery = Static<typeof reviewQuerySchema>
export const reviewQueryValidator = getValidator(reviewQuerySchema, queryValidator)
export const reviewQueryResolver = resolve<ReviewQuery, HookContext<ReviewService>>({})
