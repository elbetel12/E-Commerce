import { review } from './review/review'
import { payments } from './payments/payments'
import { orders } from './orders/orders'
import { cart } from './cart/cart'
import { categories } from './categories/categories'
import { users } from './users/users'
import { products } from './products/products'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(review)
  app.configure(payments)
  app.configure(orders)
  app.configure(cart)
  app.configure(categories)
  app.configure(users)
  app.configure(products)
  // All services will be registered here
}
