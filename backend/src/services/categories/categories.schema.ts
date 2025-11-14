// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CategoriesService } from './categories.class'

// Main data model schema
export const categoriesSchema = Type.Object({
  _id: ObjectIdSchema(),
  name: Type.String(),
  description: Type.Optional(Type.String())
}, { $id: 'Categories', additionalProperties: false })

export type Categories = Static<typeof categoriesSchema>
export const categoriesValidator = getValidator(categoriesSchema, dataValidator)
export const categoriesResolver = resolve<Categories, HookContext<CategoriesService>>({})
export const categoriesExternalResolver = resolve<Categories, HookContext<CategoriesService>>({})

export const categoriesDataSchema = Type.Pick(categoriesSchema, ['name', 'description'], { $id: 'CategoriesData' })
export type CategoriesData = Static<typeof categoriesDataSchema>
export const categoriesDataValidator = getValidator(categoriesDataSchema, dataValidator)
export const categoriesDataResolver = resolve<CategoriesData, HookContext<CategoriesService>>({})

export const categoriesPatchSchema = Type.Partial(categoriesSchema, { $id: 'CategoriesPatch' })
export type CategoriesPatch = Static<typeof categoriesPatchSchema>
export const categoriesPatchValidator = getValidator(categoriesPatchSchema, dataValidator)
export const categoriesPatchResolver = resolve<CategoriesPatch, HookContext<CategoriesService>>({})

export const categoriesQueryProperties = Type.Pick(categoriesSchema, ['_id', 'name'])
export const categoriesQuerySchema = Type.Intersect([querySyntax(categoriesQueryProperties), Type.Object({}, { additionalProperties: false })])
export type CategoriesQuery = Static<typeof categoriesQuerySchema>
export const categoriesQueryValidator = getValidator(categoriesQuerySchema, queryValidator)
export const categoriesQueryResolver = resolve<CategoriesQuery, HookContext<CategoriesService>>({})
