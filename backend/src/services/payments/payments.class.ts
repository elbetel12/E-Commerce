// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Payments, PaymentsData, PaymentsPatch, PaymentsQuery } from './payments.schema'

export type { Payments, PaymentsData, PaymentsPatch, PaymentsQuery }

export interface PaymentsParams extends MongoDBAdapterParams<PaymentsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class PaymentsService<ServiceParams extends Params = PaymentsParams> extends MongoDBService<
  Payments,
  PaymentsData,
  PaymentsParams,
  PaymentsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('payments'))
  }
}
