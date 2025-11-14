// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ProductsService } from './products.class'

// --------------------------------------
// MAIN MODEL SCHEMA
// --------------------------------------
export const productsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    price: Type.Number(),
    description: Type.Optional(Type.String()),
    category: Type.String(),
    stock: Type.Number(),
    image: Type.Optional(Type.String())
  },
  { $id: 'Products', additionalProperties: false }
)

export type Products = Static<typeof productsSchema>
export const productsValidator = getValidator(productsSchema, dataValidator)
export const productsResolver = resolve<Products, HookContext<ProductsService>>({})

export const productsExternalResolver = resolve<Products, HookContext<ProductsService>>({})

// --------------------------------------
// CREATE (DATA) SCHEMA
// --------------------------------------
// Include only fields allowed when creating
export const productsDataSchema = Type.Pick(
  productsSchema,
  ['name', 'price', 'description', 'category', 'stock', 'image'],
  { $id: 'ProductsData' }
)

export type ProductsData = Static<typeof productsDataSchema>
export const productsDataValidator = getValidator(productsDataSchema, dataValidator)
export const productsDataResolver = resolve<ProductsData, HookContext<ProductsService>>({})


// --------------------------------------
// PATCH SCHEMA
// --------------------------------------
export const productsPatchSchema = Type.Partial(productsSchema, {
  $id: 'ProductsPatch'
})

export type ProductsPatch = Static<typeof productsPatchSchema>
export const productsPatchValidator = getValidator(productsPatchSchema, dataValidator)
export const productsPatchResolver = resolve<ProductsPatch, HookContext<ProductsService>>({})


// --------------------------------------
// QUERY SCHEMA
// --------------------------------------
export const productsQueryProperties = Type.Pick(productsSchema, [
  '_id',
  'name',
  'category',
  'price',
  'stock'
])

export const productsQuerySchema = Type.Intersect(
  [
    querySyntax(productsQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type ProductsQuery = Static<typeof productsQuerySchema>
export const productsQueryValidator = getValidator(productsQuerySchema, queryValidator)
export const productsQueryResolver = resolve<ProductsQuery, HookContext<ProductsService>>({})
