import {authenticate} from '@feathersjs/authentication'
import type {HookContext} from '../../declarations'

export default {
    before : {
      all : [authenticate('jwt')],
      create : async (context : HookContext) => {
        // Set the userId to the authenticated user's ID
        context.data.userId = context.params.user._id
        return context
      },
      find : async (context : HookContext) => {
            if (context.params.user?.role !== 'admin') {
                context.params.query = {userId : context.params.user?._id}
            }
            return context
        },
        get : async (context : HookContext) =>{
            if (context.params.user?.role !== 'admin' && context.params.user._id !== context.id) {
                throw new Error('You can only access your own payments')
            }
            return context
        },
      
    
},
    after : { },
    error : {}
}