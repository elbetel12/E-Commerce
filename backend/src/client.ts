// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { reviewClient } from './services/review/review.shared'
export type { Review, ReviewData, ReviewQuery, ReviewPatch } from './services/review/review.shared'

import { paymentsClient } from './services/payments/payments.shared'
export type {
  Payments,
  PaymentsData,
  PaymentsQuery,
  PaymentsPatch
} from './services/payments/payments.shared'

import { ordersClient } from './services/orders/orders.shared'
export type { Orders, OrdersData, OrdersQuery, OrdersPatch } from './services/orders/orders.shared'

import { cartClient } from './services/cart/cart.shared'
export type { Cart, CartData, CartQuery, CartPatch } from './services/cart/cart.shared'

import { categoriesClient } from './services/categories/categories.shared'
export type {
  Categories,
  CategoriesData,
  CategoriesQuery,
  CategoriesPatch
} from './services/categories/categories.shared'

import { usersClient } from './services/users/users.shared'
export type { Users, UsersData, UsersQuery, UsersPatch } from './services/users/users.shared'

import { productsClient } from './services/products/products.shared'
export type {
  Products,
  ProductsData,
  ProductsQuery,
  ProductsPatch
} from './services/products/products.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the ecommerce app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(productsClient)
  client.configure(usersClient)
  client.configure(categoriesClient)
  client.configure(cartClient)
  client.configure(ordersClient)
  client.configure(paymentsClient)
  client.configure(reviewClient)
  return client
}
